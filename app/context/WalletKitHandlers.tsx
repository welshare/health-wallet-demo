"use client";
import { supportedNamespaces } from "@/lib/namespaces";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { default as WalletKit, WalletKitTypes } from "@reown/walletkit";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { useCallback, useEffect, useState } from "react";
import { Address, hexToString, WalletClient } from "viem";

export const WalletKitHandlers = (props: {
  walletKit: WalletKit;
  walletClient: WalletClient;
  address: Address;
}) => {
  const { walletKit, walletClient, address } = props;

  const [dialogState, setDialogState] = useState({
    proposalOpen: false,
    requestOpen: false,
  });

  const [proposal, setProposal] = useState<WalletKitTypes.SessionProposal>();

  // Add session management
  useEffect(() => {
    const initializeSessions = async () => {
      try {
        const sessions = walletKit.getActiveSessions();
        console.log("Active sessions:", sessions);

        // Restore any existing sessions
        if (sessions && Object.keys(sessions).length > 0) {
          console.log("Restoring existing sessions");
          // You might want to add additional session restoration logic here
        }
      } catch (error) {
        console.error("Error initializing sessions:", error);
      }
    };

    initializeSessions();
  }, [walletKit]);

  const onSessionProposal = useCallback(
    async (proposal: WalletKitTypes.SessionProposal) => {
      console.log("onSessionProposal", proposal);

      setDialogState((prev) => ({ ...prev, proposalOpen: true }));
      setProposal(proposal);
    },
    []
  );

  const approveProposal = useCallback(async () => {
    if (!proposal) return;
    const { id, params } = proposal;
    const namespaces = supportedNamespaces(address);
    try {
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: namespaces,
      });
      console.log("approving session", id, approvedNamespaces);
      const result = await walletKit.approveSession({
        id: id as number,
        namespaces: approvedNamespaces,
      });
      
      const sessions = walletKit.getActiveSessions();
      console.log("approveSession result", result, sessions);
    } catch (error) {
      console.error("Error approving session:", error);
      await walletKit.rejectSession({
        id: id,
        reason: getSdkError("USER_REJECTED"),
      });
    } finally {
      setDialogState((prev) => ({ ...prev, proposalOpen: false }));
    }
  }, [proposal, address, walletKit]);

  const onSessionRequest = useCallback(
    async (event: WalletKitTypes.SessionRequest) => {
      console.log("onSessionRequest", event);
      const { topic, params, id } = event;
      const { request } = params;
      try {
        // Get the message to sign
        const requestParamsMessage = request.params[0];

        // Convert the message to sign
        const message = hexToString(requestParamsMessage);
        
        // Sign the message
        const signature = await walletClient.signMessage({
          message,
          account: address,
        });

        console.log("signed message", signature);
        // once you have signed, return the signature
        await walletKit.respondSessionRequest({
          topic: topic as string,
          response: {
            id,
            result: signature,
            jsonrpc: "2.0",
          },
        });
      } catch (error) {
        console.error("Error handling session request:", error);
        await walletKit.respondSessionRequest({
          topic: topic as string,
          response: {
            id,
            error: getSdkError("USER_REJECTED"),
            jsonrpc: "2.0",
          },
        });
      }
    },
    [walletKit, walletClient, address]
  );

  useEffect(() => {
    console.log("mounting handlers");
    walletKit.on("session_proposal", onSessionProposal);
    walletKit.on("session_request", onSessionRequest);
    walletKit.on("session_delete", (event: WalletKitTypes.SessionDelete) => {
      console.log("Session deleted:", event);
    });

    return () => {
      console.log("unmounting handlers");
      walletKit.off("session_proposal", onSessionProposal);
      walletKit.off("session_request", onSessionRequest);
      walletKit.off("session_delete", () => {});
    };
  }, [walletKit, walletClient, address, onSessionProposal, onSessionRequest]);

  return (
    <Dialog
      open={dialogState.proposalOpen}
      onOpenChange={(open) =>
        setDialogState((prev) => ({ ...prev, proposalOpen: open }))
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approve Connection</DialogTitle>
          <DialogDescription>
            Approve the connection to the wallet.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" onClick={approveProposal}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import {
  ApprovalDialog,
  ApprovalDialogState,
} from "@/components/approval-dialog";

import { IWalletKit, WalletKitTypes } from "@reown/walletkit";
import { getSdkError } from "@walletconnect/utils";
import { useCallback, useEffect, useState } from "react";
import { hexToString } from "viem";
import { useWalletClient } from "wagmi";

export const WalletKitContext = (props: { children: React.ReactNode, walletKit: IWalletKit }) => {
  
  const {walletKit} = props;
  const {data: walletClient} = useWalletClient();
  const [, setActiveSessions] = useState<Record<string, any>>({});
  const [dialogState, setDialogState] = useState<ApprovalDialogState>({
    proposalOpen: false,
    requestOpen: false,
  });
  const [proposal, setProposal] = useState<WalletKitTypes.SessionProposal>();

  // useEffect(() => {
  //   const initializeSessions = async () => {
  //     try {
  //       const sessions = walletKit.getActiveSessions();
  //       console.log("Active sessions:", sessions);

  //       // Restore any existing sessions
  //       if (sessions && Object.keys(sessions).length > 0) {
  //         console.log("Restoring existing sessions");
  //         // You might want to add additional session restoration logic here
  //       }
  //     } catch (error) {
  //       console.error("Error initializing sessions:", error);
  //     }
  //   };

  //   initializeSessions();
  // }, [walletKit]);

  const onSessionProposal = useCallback(
    async (proposal: WalletKitTypes.SessionProposal) => {
      console.log("onSessionProposal", proposal);

      setDialogState((prev) => ({ ...prev, proposalOpen: true }));
      setProposal(proposal);
    },
    []
  );

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
        const signature = await walletClient?.signMessage({
          message,
          account: walletClient?.account.address,
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
    [walletKit, walletClient]
  );

  useEffect(() => {
    if (!walletKit) {
      console.warn("walletkit is not initialized");
      return;
    }
    setActiveSessions(walletKit.getActiveSessions());

    console.log("mounting handlers");
    walletKit.on("session_proposal", onSessionProposal);
    walletKit.on("session_request", onSessionRequest);
    walletKit.on("session_delete", (event: WalletKitTypes.SessionDelete) => {
      console.log("Session deleted:", event);
      setActiveSessions(walletKit.getActiveSessions());
    });

    return () => {
      console.log("unmounting handlers");
      walletKit.off("session_proposal", onSessionProposal);
      walletKit.off("session_request", onSessionRequest);
      walletKit.off("session_delete", () => {});
    };
  }, [walletKit, onSessionProposal, onSessionRequest]);

  return (
    <>
      {props.children}
      <ApprovalDialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        proposal={proposal}
      />
    </>
  );
};

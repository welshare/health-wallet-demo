"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { supportedNamespaces } from "@/lib/walletKit";

import { IWalletKit, WalletKitTypes } from "@reown/walletkit";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useAccount } from "wagmi";

export type ApprovalDialogState = {
  proposalOpen: boolean;
  requestOpen: boolean;
};

export const ApprovalDialog = (props: {
  walletKit: IWalletKit;
  proposal?: WalletKitTypes.SessionProposal;
  dialogState: ApprovalDialogState;
  setDialogState: Dispatch<SetStateAction<ApprovalDialogState>>;
}) => {
  const { address } = useAccount();
  const { walletKit } = props;

  const approveProposal = useCallback(async () => {
    if (!props.proposal || !address) return;
    const { id, params } = props.proposal;
    const namespaces = supportedNamespaces(address);
    try {
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: namespaces
      });
      console.log("approving session", id, approvedNamespaces);
      const result = await walletKit.approveSession({
        id: id as number,
        namespaces: approvedNamespaces
      });

      const sessions = walletKit.getActiveSessions();
      console.log("approveSession result", result, sessions);
    } catch (error) {
      console.error("Error approving session:", error);
      await walletKit.rejectSession({
        id: id,
        reason: getSdkError("USER_REJECTED")
      });
    } finally {
      props.setDialogState((prev) => ({ ...prev, proposalOpen: false }));
    }
  }, [props, address, walletKit]);

  return (
    <Dialog
      open={props.dialogState.proposalOpen}
      onOpenChange={(open) =>
        props.setDialogState((prev) => ({ ...prev, proposalOpen: open }))
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

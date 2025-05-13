import { IWalletKit, WalletKitTypes } from "@reown/walletkit";
import { getSdkError } from "@walletconnect/utils";
import { useCallback, useEffect, useState } from "react";
import { Hex, hexToString } from "viem";
import { useWalletClient } from "wagmi";
import { ApprovalDialogState } from "../approval-dialog";

export const useWalletKitHandlers = ({
  walletKit,
  setDialogState,
}: {
  walletKit?: IWalletKit;
  setDialogState: React.Dispatch<React.SetStateAction<ApprovalDialogState>>;
}) => {
  const { data: walletClient } = useWalletClient();
  const [proposal, setProposal] = useState<WalletKitTypes.SessionProposal>();
  const [activeSessions, setActiveSessions] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!walletKit) {
      return;
    }
    (async () => {
      try {
        const sessions = walletKit.getActiveSessions();
        console.log("Active sessions:", sessions);

        // Restore any existing sessions
        if (sessions && Object.keys(sessions).length > 0) {
          console.log("Restoring existing sessions");
          setActiveSessions(sessions);
          // You might want to add additional session restoration logic here
        }
      } catch (error) {
        console.error("Error initializing sessions:", error);
      }
    })();
  }, [walletKit]);

  const onSessionProposal = useCallback(
    async (proposal: WalletKitTypes.SessionProposal) => {
      console.log("onSessionProposal", proposal);
      setDialogState((prev) => ({ ...prev, proposalOpen: true }));
      setProposal(proposal);
    },
    [setDialogState]
  );

  const onSessionRequest = useCallback(
    async (event: WalletKitTypes.SessionRequest) => {
      console.log("onSessionRequest", event);
      const { topic, params, id } = event;
      const { request } = params;

      try {
        if (!walletClient || !walletKit || !walletClient.account?.address) {
          throw new Error("no wallet client");
        }
        let signature: Hex;
        if (request.method === "eth_signTypedData_v4") {
          const typedDataConfig = JSON.parse(request.params[1]);
          console.log("typedDataConfig", typedDataConfig);
          signature = await walletClient.signTypedData(typedDataConfig);
        } else if (request.method === "personal_sign") {
          const requestParamsMessage = request.params[0];
          const message = hexToString(requestParamsMessage);

          signature = await walletClient.signMessage({
            message,
            account: walletClient.account.address,
          });
        } else {
          throw new Error(`request ${request.method} not supported`);
        }

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
        await walletKit?.respondSessionRequest({
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
    if (!walletKit || !walletClient) {
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
      setActiveSessions({});
    };
  }, [walletKit, walletClient, onSessionProposal, onSessionRequest]);

  return {
    activeSessions,
    proposal,
  };
};

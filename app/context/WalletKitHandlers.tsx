import { supportedNamespaces } from "@/lib/namespaces";

import { default as WalletKit, WalletKitTypes } from "@reown/walletkit";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { useCallback, useEffect } from "react";
import { Address, hexToString, WalletClient } from "viem";

export const WalletKitHandlers = (props: {
  walletKit: WalletKit,
  walletClient: WalletClient,
  address: Address
}) => {
  const { walletKit, walletClient, address } = props;
  const onSessionProposal = useCallback(async ({
    id,
    params,
  }: WalletKitTypes.SessionProposal) => {
    const namespaces = supportedNamespaces(address);

    console.log("onSessionProposal", id, namespaces, params);
    
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
    }
  }, [walletKit, walletClient, address]);

  const onSessionRequest = useCallback(async (event: WalletKitTypes.SessionRequest) => {
    const { topic, params, id } = event;
    const { request } = params;
    // Get the message to sign
    const requestParamsMessage = request.params[0];

    // Convert the message to sign
    const message = hexToString(requestParamsMessage);
    console.log("onSessionRequest", event);

    // Sign the message
    // You can use the `signMessage` method from your walletClient instance
    //        const signedMessage = await signMessageAsync({ message });
    const signature = await walletClient.signMessage({
      message,
      account: address,
    });

    // once you have signed, return the signature
    await walletKit.respondSessionRequest({
      topic: topic as string,
      response: {
        id,
        result: signature,
        jsonrpc: "2.0",
      },
    });
  }, [walletKit, walletClient, address]);

  useEffect(() => {
    console.log("mounting handlers");
    walletKit.on("session_proposal", onSessionProposal);
    walletKit.on("session_request", onSessionRequest);
    return () => {
      console.log("unmounting handlers");
      walletKit.off("session_proposal", onSessionProposal);
      walletKit.off("session_request", onSessionRequest);
    }
  }, [walletKit, walletClient, address]);
  
  return <></>
};

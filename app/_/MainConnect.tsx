"use client";
import { Button } from "@/components/ui/button";
import { WalletConnectDialog } from "@/components/wallect-connect-dialog";
import {
  SequenceConnect,
  useOpenConnectModal,
  useSignInEmail,
} from "@0xsequence/connect";
import {
  SequenceWalletProvider,
  useOpenWalletModal,
} from "@0xsequence/wallet-widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { WalletKitProvider } from "../context/WalletkitContext";
import { waasConfig } from "./waas/config";

const queryClient = new QueryClient();

const ConnectButton = () => {
  const { isConnected } = useAccount();

  const { disconnect } = useDisconnect();
  const { setOpenConnectModal } = useOpenConnectModal();

  if (isConnected) {
    return <Button onClick={() => disconnect()}>disconnect</Button>;
  }

  return (
    <>
      <Button onClick={() => setOpenConnectModal(true)}>Connect</Button>
    </>
  );
};

const WagmiComponent = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const email = useSignInEmail();
  const { setOpenWalletModal } = useOpenWalletModal();
  return (
    <div>
      <p>Connected Address: {address}</p>
      <p>Chains: {chainId}</p>
      <p>Email: {email}</p>
      <Button onClick={() => setOpenWalletModal(true, {})}>manage</Button>
    </div>
  );
};

export default function MainConnect() {
  return (
    <QueryClientProvider client={queryClient}>
      <SequenceConnect config={waasConfig}>
        <SequenceWalletProvider>
          <WalletKitProvider>
            <ConnectButton />
            <WagmiComponent />
            <WalletConnectDialog />
          </WalletKitProvider>
        </SequenceWalletProvider>
      </SequenceConnect>
    </QueryClientProvider>
  );
}

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
import { useAccount, useDisconnect } from "wagmi";
import { WalletKitProvider } from "../context/WalletkitContext";
import { waasConfig } from "./waas/config";

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
  const { chain, address, isConnected } = useAccount();

  const email = useSignInEmail();
  const { setOpenWalletModal } = useOpenWalletModal();
  return (
    <div>
      <p>Connected Address: {address}</p>
      <p>Chain: {chain?.id}</p>
      <p>Email: {email}</p>
      <Button onClick={() => setOpenWalletModal(true, {})}>manage</Button>
    </div>
  );
};

export default function MainConnect() {
  return (
    <SequenceConnect config={waasConfig}>
      <SequenceWalletProvider>
        <WalletKitProvider>
          <ConnectButton />
          <WagmiComponent />
          <WalletConnectDialog />
        </WalletKitProvider>
      </SequenceWalletProvider>
    </SequenceConnect>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { WalletConnectDialog } from "@/components/wallect-connect-dialog";
import { useOpenConnectModal, useSignInEmail } from "@0xsequence/connect";
import { useOpenWalletModal } from "@0xsequence/wallet-widget";
import { useAccount, useChainId, useDisconnect } from "wagmi";

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
  const { address } = useAccount();
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
    <>
      <ConnectButton />
      <WagmiComponent />
      <WalletConnectDialog />
    </>
  );
}

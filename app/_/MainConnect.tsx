"use client";
import { Button } from "@/components/ui/button";
import { WalletConnectDialog } from "@/components/wallet-connect-dialog";
import { WalletConnectSessions } from "@/components/wallet-connect-sessions";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useChainId, useDisconnect } from "wagmi";

const ConnectButton = () => {
  const { isConnected } = useAccount();

  const { disconnect } = useDisconnect();
  const { connectOrCreateWallet, logout } = usePrivy();

  if (isConnected) {
    return (
      <Button
        onClick={async () => {
          await logout();
          disconnect();
        }}
      >
        logout
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => connectOrCreateWallet()}>Connect</Button>
    </>
  );
};

const WagmiComponent = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { user } = usePrivy();

  //const email = useSignInEmail();
  //const { setOpenWalletModal } = useOpenWalletModal();
  return (
    <div>
      <p>Connected Address: {address} {!isConnected && "Not Connected"}</p>
      <p>Chains: {chainId}</p>
      <p>Google: {user?.google?.email} </p>
      <p>email: {user?.email?.address} </p>
      {/* <Button onClick={() => setOpenWalletModal(true, {})}>manage</Button> */}
    </div>
  );
};

export default function MainConnect() {

  return (
    <>
      <ConnectButton />
      <WagmiComponent />
      <WalletConnectDialog />
      <WalletConnectSessions />
    </>
  );
}

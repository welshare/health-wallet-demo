"use client";
import { Button } from "@/components/ui/button";
import { WalletConnectDialog } from "@/components/wallet-connect-dialog";
import { WalletConnectSessions } from "@/components/wallet-connect-sessions";
import { usePrivy } from "@privy-io/react-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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
      <Button onClick={() => connectOrCreateWallet()}>Connect Account</Button>
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
      <p>
        Connected Address: {address} {!isConnected && "Not Connected"}
      </p>
      <p>Chains: {chainId}</p>
      <p>Google: {user?.google?.email} </p>
      <p>email: {user?.email?.address} </p>
      {/* <Button onClick={() => setOpenWalletModal(true, {})}>manage</Button> */}
    </div>
  );
};

const ConnectedWallet = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { user } = usePrivy();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{address}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <WagmiComponent />
      <WalletConnectDialog />
      <WalletConnectSessions />
    </div>
  );
};
export default function Wallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return ConnectedWallet();
  }

  return <ConnectButton />;
}

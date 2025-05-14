"use client";
import { WalletConnectIcon } from "@/components/icons/WalletConnectIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletConnectDialog } from "@/components/wallet-connect-dialog";
import truncateEthAddress from "@/lib/truncate";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useChainId, useDisconnect } from "wagmi";

const ConnectButton = () => {
  const { connectOrCreateWallet } = usePrivy();
  return (
    <Button onClick={() => connectOrCreateWallet()}>Connect Account</Button>
  );
};

const ConnectedWallet = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  const { user, logout } = usePrivy();

  const emailAddress = user?.google?.email || user?.email?.address;
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {truncateEthAddress(address || "0x")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {truncateEthAddress(address || "0x")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{emailAddress}</DropdownMenuLabel>
          <DropdownMenuLabel>Chain {chainId}</DropdownMenuLabel>
          {/* <WalletConnectSessions />  */}
          <DropdownMenuItem
            onClick={async () => {
              await logout();
              disconnect();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <WalletConnectDialog>
        <Button variant="outline" size="icon">
          <WalletConnectIcon />
        </Button>
      </WalletConnectDialog>
    </div>
  );
};
export default function Wallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return (
      <div>
        <ConnectedWallet />
      </div>
    );
  }

  return (
    <>
      <ConnectButton />
    </>
  );
}

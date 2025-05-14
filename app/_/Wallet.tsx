"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"outline"}>
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

      {/* <WagmiComponent />
      <WalletConnectDialog />
      <WalletConnectSessions /> */}
    </div>
  );
};
export default function Wallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <ConnectedWallet />;
  }

  return (
    <>
      <ConnectButton />
    </>
  );
}

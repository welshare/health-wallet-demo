"use client";
import { useWalletKit } from "@/components/context/WalletKitContext";
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
import { useCrossAppAccounts, usePrivy } from "@privy-io/react-auth";
import { getSdkError } from "@walletconnect/utils";
import { useCallback } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { EthAvatar } from "./components/EthAvatar";
import { LinkWallet } from "./components/LinkWallet";
import { SigninButton } from "./components/SigninControl";

const LoginWithWelshareButton = () => {
  const { loginWithCrossAppAccount } = useCrossAppAccounts();
  return (
    <Button
      onClick={() =>
        loginWithCrossAppAccount({ appId: "insert-provider-app-id" })
      }
    >
      Login with Welshare
    </Button>
  );
};
const ConnectedWallet = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { sessions, walletKit } = useWalletKit();

  const { user, logout } = usePrivy();

  const disconnectSession = useCallback(
    async (topic: string) => {
      if (!walletKit) return;
      await walletKit.disconnectSession({
        topic,
        reason: getSdkError("USER_DISCONNECTED"),
      });
    },
    [walletKit],
  );

  const emailAddress =
    user?.google?.email || user?.apple?.email || user?.email?.address;

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {address ? truncateEthAddress(address || "0x") : emailAddress}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {address ? (
              <div className="flex flex-row gap-2">
                <EthAvatar address={address} />
                <span>{truncateEthAddress(address || "0x")}</span>
              </div>
            ) : (
              <LinkWallet className="text-sm flex-col" size="sm" />
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{emailAddress}</DropdownMenuLabel>
          <DropdownMenuLabel>Chain {chainId}</DropdownMenuLabel>
          {sessions &&
            Object.values(sessions).map((session) => (
              <DropdownMenuItem
                key={session.topic}
                onClick={() => disconnectSession(session.topic)}
              >
                <img
                  src={session.peer.metadata.icons[0]}
                  alt={session.peer.metadata.name}
                  className="w-5 h-5 object-cover"
                />
                <span className="font-medium text-foreground">
                  {session.peer.metadata.name}
                </span>
              </DropdownMenuItem>
            ))}
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
  const { ready, authenticated } = usePrivy();

  if (!ready) return null;

  if (authenticated) {
    return (
      <div>
        <ConnectedWallet />
      </div>
    );
  }

  return (
    <div>
      <SigninButton />
    </div>
  );
}

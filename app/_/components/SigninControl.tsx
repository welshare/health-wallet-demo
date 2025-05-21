"use client";
import { Button } from "@/components/ui/button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { LOGIN_METHODS } from "../privy/config";
import { LinkWallet } from "./LinkWallet";

export const SigninButton = () => {
  const { ready, authenticated, login } = usePrivy();
  const { isConnected } = useAccount();

  if (!ready) return null;

  if (!authenticated && !isConnected) {
    return (
      <Button
        onClick={() => login({ loginMethods: LOGIN_METHODS })}
        disabled={!ready}
      >
        Sign in with an email address
      </Button>
    );
  }
};

export const SigninControl = () => {
  const { ready, authenticated } = usePrivy();
  const { isConnected } = useAccount();
  const { wallets, ready: walletsReady } = useWallets();
  if (!ready) return null;

  if (!authenticated && !isConnected) {
    return <SigninButton />;
  }
  if (walletsReady && wallets.length == 0) {
    return <LinkWallet size="sm" />;
  }
  const wallet = wallets[0];
  return <p>{wallet.address}</p>;
};

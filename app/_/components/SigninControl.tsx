"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import truncateEthAddress from "@/lib/truncate";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { LOGIN_METHODS } from "../privy/config";
import { EthAvatar } from "./EthAvatar";
import { LinkWallet } from "./LinkWallet";

export const SigninButton = (props: ButtonProps) => {
  const { ready, authenticated, login } = usePrivy();
  const { isConnected } = useAccount();

  if (!ready) return null;

  if (!authenticated && !isConnected) {
    return (
      <Button
        variant={props.variant || "default"}
        onClick={() => login({ loginMethods: LOGIN_METHODS })}
        disabled={!ready}
      >
        Sign in with an email address
      </Button>
    );
  }
};

export const SigninControl = () => {
  const { ready, authenticated, user, linkWallet } = usePrivy();
  const { isConnected } = useAccount();
  const { wallets, ready: walletsReady } = useWallets();
  if (!ready) return null;

  if (!authenticated && !isConnected) {
    return <SigninButton variant="secondary" />;
  }
  if (!walletsReady) return null;

  if (wallets.length == 0) {
    return <LinkWallet size="sm" />;
  }
  const wallet = wallets[0];

  const emailAddress =
    user?.email?.address || user?.apple?.email || user?.google?.email;
  return (
    <p className="w-full">
      You&apos;re signed in as{"  "}{" "}
      <span className="font-mono">{emailAddress}</span> {"  "}
      using{"  "}
      <EthAvatar address={wallet.address} className="inline" />
      {"  "}
      {truncateEthAddress(wallet.address as Address, 7, 7)}
      {"  "}(
      <Button
        size="sm"
        variant="ghost"
        className="p-0.5"
        onClick={() =>
          linkWallet({
            walletList: ["detected_ethereum_wallets", "wallet_connect"]
          })
        }
      >
        {wallet.meta.name}
      </Button>
      )
    </p>
  );
};

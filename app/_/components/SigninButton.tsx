"use client";
import { Button } from "@/components/ui/button";
import { useLinkAccount, usePrivy, useWallets } from "@privy-io/react-auth";
import React from "react";
import { useAccount, useConnect, useConnectors } from "wagmi";
import { AllWallets } from "./AllWallets";

const ConnectWalletControl = () => {
  const { linkEmail } = useLinkAccount();
  const connectors = useConnectors();
  const { connect } = useConnect();

  const { address, isConnected } = useAccount();

  const {
    user,
    authenticated,
    ready,
    login,
    logout,
    updateEmail,
    connectWallet,
    connectOrCreateWallet,
    createWallet,
    linkWallet,
  } = usePrivy();

  const { wallets, ready: walletsReady } = useWallets();
  console.log("connectors", connectors);
  console.log("wallets", walletsReady, wallets, user?.wallet);
  const emailAddress = user?.google?.email || user?.email?.address;
  // return (
  //   <div className="flex items-center gap-1">
  //     <Button variant="outline">{truncateEthAddress(address || "0x")}</Button>
  //   </div>
  // );

  if (!authenticated && !isConnected) {
    return (
      <Button
        onClick={() => login({ loginMethods: ["google", "email"] })}
        disabled={!ready}
      >
        Login with your email address
      </Button>
    );
  }
  // if (!authenticated && !emailAddress)
  //   return <Button onClick={() => login()}>Connect Account</Button>;

  if (authenticated && !isConnected) {
    if (wallets.length == 0) {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Button
            onClick={() =>
              linkWallet({
                walletList: ["detected_ethereum_wallets", "wallet_connect"],
              })
            }
          >
            link wallet
          </Button>{" "}
          <span>or</span>
          <Button onClick={() => createWallet()}>
            create a wallet in your browser.
          </Button>
        </div>
      );
    }
    return (
      <Button onClick={() => connect({ connector: connectors[0] })}>
        connect or create wallet
      </Button>
    );
  }

  /*  if (!isConnected && !emailAddress && authenticated)
    return (
      <>
        <Button onClick={() => linkWallet()}>link wallet</Button>
        <Button onClick={() => logout()}>disconnect</Button>
      </>
    );
    */

  if (isConnected && authenticated && !emailAddress)
    return <Button onClick={() => linkEmail()}>link an email address</Button>;
};

export const Signin = (props: { children: React.ReactNode }) => {
  const { ready, authenticated } = usePrivy();
  const { isConnected } = useAccount();

  if (!ready) return null;

  return (
    <>
      <ConnectWalletControl />
      <AllWallets />
    </>
  );
};

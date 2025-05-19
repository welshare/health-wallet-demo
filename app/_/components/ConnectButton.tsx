"use client";
import { Button } from "@/components/ui/button";
import { useLinkAccount, useLogin, usePrivy } from "@privy-io/react-auth";
import React from "react";
import { useAccount } from "wagmi";

const ConnectedWallet = () => {
  const { linkEmail } = useLinkAccount();

  const { address, isConnected } = useAccount();
  const { login } = useLogin();
  const {
    user,
    authenticated,
    ready,
    logout,
    updateEmail,
    connectWallet,
    linkWallet,
  } = usePrivy();

  const emailAddress = user?.google?.email || user?.email?.address;
  // return (
  //   <div className="flex items-center gap-1">
  //     <Button variant="outline">{truncateEthAddress(address || "0x")}</Button>
  //   </div>
  // );

  if (isConnected && !authenticated) {
    return (
      <Button onClick={() => login()} disabled={!ready}>
        authenticate
      </Button>
    );
  }

  if (isConnected && !emailAddress)
    return <Button onClick={() => linkEmail()}>link an email address</Button>;

  if (isConnected && emailAddress)
    return (
      <div className="flex flex-col gap-2">
        <p>Email: {emailAddress}</p>
        <Button onClick={() => updateEmail()}>update email</Button>
      </div>
    );
  if (!isConnected && !emailAddress && authenticated)
    return (
      <>
        <Button onClick={() => linkWallet()}>link wallet</Button>
        <Button onClick={() => logout()}>disconnect</Button>
      </>
    );

  if (!authenticated && !emailAddress)
    return <Button onClick={() => login()}>Connect Account</Button>;
};

export const ConnectButton = (props: { children: React.ReactNode }) => {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const { isConnected } = useAccount();

  if (!ready) return null;
  console.log("authenticated", authenticated, "isConnected", isConnected);

  if (!authenticated || !isConnected) {
    return <ConnectedWallet />;
  }

  return (
    <Button size="xl" onClick={() => login()}>
      {props.children}
    </Button>
  );
};

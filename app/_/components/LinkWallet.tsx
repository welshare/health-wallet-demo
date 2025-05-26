"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  useActiveWallet,
  useCrossAppAccounts,
  usePrivy,
  useWallets
} from "@privy-io/react-auth";
import clsx from "clsx";
import { useMemo } from "react";
import { useAccount, useConnect, useConnectors } from "wagmi";
import { ABSTRACT_PROVIDER_APP_ID } from "../privy/config";

export const LinkWallet = (props: {
  className?: string;
  size?: ButtonProps["size"];
}) => {
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { linkCrossAppAccount, loginWithCrossAppAccount } =
    useCrossAppAccounts();

  const { setActiveWallet, wallet } = useActiveWallet();

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
    linkEmail
  } = usePrivy();

  const abstractAccount = useMemo(() => {
    if (!user) return null;
    console.log("LINKED_ACCOUNTS", user.linkedAccounts);

    return user.linkedAccounts.find(
      (account) =>
        account.type === "cross_app" &&
        account.providerApp.id === ABSTRACT_PROVIDER_APP_ID
    );
  }, [user]);

  const { wallets, ready: walletsReady } = useWallets();
  console.log("connectors", connectors);
  console.log("wallets", walletsReady, wallets, user?.wallet);
  const emailAddress =
    user?.google?.email || user?.apple?.email || user?.email?.address;
  // return (
  //   <div className="flex items-center gap-1">
  //     <Button variant="outline">{truncateEthAddress(address || "0x")}</Button>
  //   </div>
  // );

  // if (!authenticated && !emailAddress)
  //   return <Button onClick={() => login()}>Connect Account</Button>;

  return (
    <div className={clsx(props.className, "flex items-center gap-1")}>
      <Button
        size={props.size}
        onClick={() =>
          linkWallet({
            walletList: ["detected_ethereum_wallets", "wallet_connect"]
          })
        }
      >
        connect a wallet
      </Button>{" "}
      <span>or</span>
      <Button onClick={() => createWallet()} size={props.size}>
        create an embedded wallet
      </Button>
      {/* <span>or</span>
      <Button
        onClick={async () => {
          // const _user = await loginWithCrossAppAccount({
          //   appId: ABSTRACT_PROVIDER_APP_ID,
          // });
          const _user = await linkCrossAppAccount({
            appId: ABSTRACT_PROVIDER_APP_ID,
          });
          const wallet = _user.linkedAccounts.find(
            (account) =>
              account.type === "cross_app" &&
              account.providerApp.id === ABSTRACT_PROVIDER_APP_ID,
          );

          console.log(_user, wallet);
        }}
      >
        connect your welshare wallet.
      </Button> */}
    </div>
  );

  // return (
  //   <Button onClick={() => connect({ connector: connectors[0] })}>
  //     connect or create wallet
  //   </Button>
  // );

  /*  if (!isConnected && !emailAddress && authenticated)
    return (
      <>
        <Button onClick={() => linkWallet()}>link wallet</Button>
        <Button onClick={() => logout()}>disconnect</Button>
      </>
    );
    */
};

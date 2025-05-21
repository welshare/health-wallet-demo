"use client";
import { useLinkAccount, usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

export const LinkAccounts = () => {
  const { linkEmail } = useLinkAccount();

  const { ready: walletsReady, wallets } = useWallets();
  const { address, isConnected } = useAccount();
  const {
    user,
    authenticated,
    login,
    logout,
    updateEmail,
    connectWallet,
    linkWallet
  } = usePrivy();

  const emailAddress = user?.google?.email || user?.email?.address;

  return (
    <div className="flex flex-col gap-2 py-8">
      {authenticated && !isConnected && (
        <Button onClick={() => connectWallet()}>connect Wallet!</Button>
      )}
      {wallets && wallets.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold">Wallets</h4>
          <div className="flex flex-col gap-2">
            {wallets.map((wallet) => (
              <div key={wallet.address}>{wallet.address}</div>
            ))}
            <Button variant="secondary" onClick={() => linkWallet()}>
              link wallet
            </Button>
          </div>
        </div>
      )}

      {isConnected && !emailAddress && (
        <Button onClick={() => linkEmail()}>link email</Button>
      )}
      {isConnected && emailAddress && (
        <div className="flex flex-col gap-2">
          <p>Email: {emailAddress}</p>
          <Button onClick={() => updateEmail()}>update email</Button>
        </div>
      )}
      {!isConnected && !emailAddress && authenticated && (
        <Button onClick={() => linkWallet()}>link wallet</Button>
      )}
      {!authenticated && !emailAddress && (
        <Button onClick={() => login()}>Connect Account</Button>
      )}
    </div>
  );
};

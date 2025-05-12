"use client";

import { default as WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useAccount, useWalletClient } from "wagmi";
import { WalletKitHandlers } from "./WalletKitHandlers";

interface WalletKitContextType {
  walletKit?: WalletKit;
}

const WalletKitContext = createContext<WalletKitContextType>({});

export const WalletKitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletKit, setWalletKit] = useState<WalletKit>();

  //const { signMessageAsync } = useSignMessage();
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected || !walletClient || !address) {
      setWalletKit(undefined);
      return;
    }

    let _walletKit: WalletKit;

    (async function initialiseWalletKit() {
      try {
        console.log(
          "initialising walletkit",
          isConnected,
          walletClient,
          address
        );
        const core = new Core({
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
        });

        _walletKit = await WalletKit.init({
          core,
          metadata: {
            name: "DAO Governance Wallet", // replace with your own name
            description: "Allows DAO members to vote on proposals", // replace with your desc
            url: "http://localhost:3000", // replace with your url
            icons: [], // add your wallet's icon URL
          },
        });
        console.log("WalletKit initialised", _walletKit);
        setWalletKit(_walletKit);
      } catch (error) {
        console.error("Error initialising WalletKit", error);
      }
    })();
  }, [isConnected, walletClient, address]);

  return (
    <WalletKitContext.Provider value={{ walletKit }}>
      {walletKit && walletClient && address && (
        <WalletKitHandlers
          walletKit={walletKit}
          walletClient={walletClient}
          address={address}
        />
      )}
      {children}
    </WalletKitContext.Provider>
  );
};

// useEffect(() => {
//   if (!walletKit || !address || !chainId) return;
//   console.log("UPDATING address chain id ", address, chainId);
//   updateSignClientChainId(walletKit, "" + chainId, address);
// }, [walletKit, address, chainId]);

export const useWalletKit = () => {
  const context = useContext(WalletKitContext);
  if (!context) {
    throw new Error("useWalletKit must be used within a WalletKitProvider");
  }
  return context;
};

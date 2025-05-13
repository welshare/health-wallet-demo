"use client";

import { IWalletKit, default as WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";

import React, { useCallback, useEffect, useState } from "react";
import { WalletKitContext } from "./WalletKitContext";

let walletKit: IWalletKit | null = null;

export async function initializeWallet() {
  try {
    const core = new Core({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      customStoragePrefix: "welshare-client-role-", // this allows using walletkit along walletconnect in the same browser
      name: "Welshare Client Role",
    });

    walletKit = await WalletKit.init({
      core,
      metadata: {
        name: "DAO Governance Wallet", // replace with your own name
        description: "Allows DAO members to vote on proposals", // replace with your desc
        url: "http://localhost:3000", // replace with your url
        icons: [], // add your wallet's icon URL
      },
    });

    return walletKit;
  } catch (error) {
    console.error("Failed to initialize wallet:", error);
  }
}

// Returns the walletkit instance
export function getWalletKit(): IWalletKit {
  if (!walletKit) {
    throw new Error("WalletKit not initialized");
  }
  return walletKit;
}

export const WalletKitGlobals = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onInitialize = useCallback(async () => {
    if (initialized) {
      console.log("already initialized");
      return;
    }

    try {
      setIsLoading(true);
      await initializeWallet();
      setInitialized(true);
    } catch (err) {
      console.log(err);
      setError(
        err instanceof Error ? err.message : "Failed to initialize wallet"
      );
    } finally {
      setIsLoading(false);
    }
  }, [initialized]);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => {
              setError(null);
              onInitialize();
            }}
            className="px-4 py-2 text-sm text-white bg-primary rounded hover:bg-primary/80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !walletKit) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-gray-500 animate-pulse">
            Initializing Wallet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <WalletKitContext walletKit={walletKit}>{children}</WalletKitContext>
    </>
  );
};

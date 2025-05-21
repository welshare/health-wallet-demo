"use client";

import { default as WalletKit } from "@reown/walletkit";

import React, { createContext, useContext, useEffect, useState } from "react";

import { initializeWalletKit } from "@/lib/walletKit";
import { ApprovalDialog, ApprovalDialogState } from "../approval-dialog";
import { useWalletKitHandlers } from "./useWalletKitHandlers";

interface WalletKitContextType {
  walletKit?: WalletKit;
  sessions: Record<string, any>;
}

const WalletKitContext = createContext<WalletKitContextType>({ sessions: {} });

export const WalletKitProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [walletKit, setWalletKit] = useState<WalletKit>();

  const [dialogState, setDialogState] = useState<ApprovalDialogState>({
    proposalOpen: false,
    requestOpen: false
  });

  const { activeSessions, proposal } = useWalletKitHandlers({
    walletKit,
    setDialogState
  });

  useEffect(() => {
    (async () => {
      setWalletKit(
        await initializeWalletKit(
          process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
          "http://localhost:3000"
        )
      );
    })();
  }, []);

  // if (!walletKit) {
  //   return <div className="flex items-center justify-center min-h-screen">
  //       <div className="flex flex-col items-center gap-3">
  //         <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  //         <p className="text-sm text-gray-500 animate-pulse">
  //           Initializing Wallet...
  //         </p>
  //       </div>
  //     </div>
  // }

  return (
    <WalletKitContext.Provider value={{ walletKit, sessions: activeSessions }}>
      {children}
      {walletKit && (
        <ApprovalDialog
          walletKit={walletKit}
          dialogState={dialogState}
          setDialogState={setDialogState}
          proposal={proposal}
        />
      )}
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

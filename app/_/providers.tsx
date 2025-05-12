"use client";
import {
  SequenceConnect
} from "@0xsequence/connect";
import {
  SequenceWalletProvider
} from "@0xsequence/wallet-widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletKitProvider } from "../context/WalletkitContext";
import { waasConfig } from "./waas/config";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SequenceConnect config={waasConfig}>
        <SequenceWalletProvider>
          <WalletKitProvider>{children}</WalletKitProvider>
        </SequenceWalletProvider>
      </SequenceConnect>
    </QueryClientProvider>
  );
};

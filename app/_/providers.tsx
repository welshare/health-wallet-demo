"use client";
import {
  SequenceConnect
} from "@0xsequence/connect";
import {
  SequenceWalletProvider
} from "@0xsequence/wallet-widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WalletKitGlobals } from "@/components/context/WalletKitGlobals";
import { waasConfig } from "./waas/config";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SequenceConnect config={waasConfig}>
        <SequenceWalletProvider>
          <WalletKitGlobals>{children}</WalletKitGlobals>
        </SequenceWalletProvider>
      </SequenceConnect>
    </QueryClientProvider>
  );
};

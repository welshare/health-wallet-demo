"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WalletKitProvider } from "@/components/context/WalletKitContext";
import { wagmiConfig } from "./privy/config";
//import { waasConfig } from "./waas/config";

const privyConfig = {};
const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <WalletKitProvider>{children}</WalletKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

{
  /* </SequenceWalletProvider>
<SequenceConnect config={waasConfig}>
<SequenceWalletProvider>
</SequenceConnect> */
}

import { PrivyClientConfig } from "@privy-io/react-auth";
import { baseSepolia, mainnet, sepolia } from 'viem/chains';
import { http, injected } from 'wagmi';

import { createConfig } from '@privy-io/wagmi';
import { walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  }
});

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    showWalletUIs: true
  },
  loginMethods: ['wallet', 'email', 'sms', "google", "github"],
  appearance: {
    showWalletLoginFirst: true
  }
};
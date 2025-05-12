import { PrivyClientConfig } from "@privy-io/react-auth";
import { baseSepolia, mainnet, sepolia } from 'viem/chains';
import { http } from 'wagmi';

import { createConfig } from '@privy-io/wagmi';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
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
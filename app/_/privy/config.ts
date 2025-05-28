import {
  LoginMethodOrderOption,
  NonEmptyArray,
  PrivyClientConfig
} from "@privy-io/react-auth";
import { baseSepolia, mainnet, sepolia } from "viem/chains";
import { http, injected } from "wagmi";

import { createConfig } from "@privy-io/wagmi";
import { walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!
    })
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http()
  }
});

export const LOGIN_METHODS: PrivyClientConfig["loginMethods"] = [
  "google",
  "email",
  "discord"
];

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    ethereum: {
      createOnLogin: "off"
    }
  },
  loginMethodsAndOrder: {
    primary: [
      ...(LOGIN_METHODS as NonEmptyArray<LoginMethodOrderOption>),
      "detected_ethereum_wallets",
      "wallet_connect"
      // `privy:${WELSHARE_PROVIDER_APP_ID}`,
    ],
    overflow: [] //"detected_wallets"
  },
  appearance: {
    showWalletLoginFirst: false
  }
};

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
  "apple"
];

export const ABSTRACT_PROVIDER_APP_ID = "cm04asygd041fmry9zmcyn5o5";
export const ZORA_PROVIDER_APP_ID = "clpgf04wn04hnkw0fv1m11mnb";
const STRAWBERRY_PROVIDER_APP_ID = "clxva96js0039k9pb3pw2uovx";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    ethereum: {
      createOnLogin: "off"
    }
  },
  loginMethodsAndOrder: {
    primary: [
      ...(LOGIN_METHODS as NonEmptyArray<LoginMethodOrderOption>)
      // `privy:${ZORA_PROVIDER_APP_ID}`,
      // `privy:${STRAWBERRY_PROVIDER_APP_ID}`,
      //"wallet_connect",
    ],
    overflow: [] //"detected_wallets"
  },
  appearance: {
    showWalletLoginFirst: true
  }
};

import { createConfig, getDefaultConnectors } from "@0xsequence/connect";

const projectAccessKey = process.env.NEXT_PUBLIC_ACCESS_KEY as string
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string

// const connectors = getDefaultConnectors( "universal", {
//   walletConnectProjectId: 'wallet-connect-id',
//   defaultChainId: 1,
//   appName: 'demo app',
//   projectAccessKey
// })

//https://docs.sequence.xyz/sdk/web/custom-configuration
export const waasConfig = createConfig("waas" /*or, 'universal'*/, {
  appName: "lcl",
  projectAccessKey,
  chainIds: [1, 84532],
  defaultChainId: 84532,
  wagmiConfig: {
    ssr: true,
  },
  waasConfigKey: process.env.NEXT_PUBLIC_CONFIG_KEY!, // for waas
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  },
  walletConnect: {
    projectId: walletConnectProjectId,
  },
});
import { default as WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";

import { Address } from "viem";

const supportedChains = [1, 8453, 84532, 11155111];

export const supportedNamespaces = (account: Address) => {
  return {
    // You can add multiple namespaces like cosmos, near, solana, etc
    eip155: {
      chains: supportedChains.map((ch) => `eip155:${ch}`),
      methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData_v4"],
      events: ["accountsChanged", "chainChanged"],
      accounts: supportedChains.map((ch) => `eip155:${ch}:${account}`)
    }
  };
};

export async function initializeWalletKit(
  walletConnectProjectId: string,
  url = "http://localhost:3000"
): Promise<WalletKit> {
  try {
    const core = new Core({
      projectId: walletConnectProjectId,
      customStoragePrefix: "welshare-client-role-", // this allows using walletkit along walletconnect in the same browser
      name: "Welshare Client Role"
    });

    return WalletKit.init({
      core,
      metadata: {
        name: "DAO Governance Wallet", // replace with your own name
        description: "Allows DAO members to vote on proposals", // replace with your desc
        url, // replace with your url
        icons: [] // add your wallet's icon URL
      }
    });
  } catch (error) {
    console.error("Failed to initialize wallet:", error);
    throw error;
  }
}

"use client";

import { Address } from "viem";

const supportedChains = [1, 8453, 84532, 11155111];

export const supportedNamespaces = (account: Address) => {
  return {      // You can add multiple namespaces like cosmos, near, solana, etc
      eip155: {
        chains: supportedChains.map((ch) => `eip155:${ch}`),
        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData_v4"],
        events: ["accountsChanged", "chainChanged"],
        accounts: supportedChains.map((ch) => `eip155:${ch}:${account}`),
      },
    }
}

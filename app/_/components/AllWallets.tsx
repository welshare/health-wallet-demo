"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";

export const AllWallets = () => {
  const { ready, linkWallet, linkEmail, login } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();

  if (!ready) return null;
  return (
    <div className="flex flex-col gap-2">
      <div>
        {wallets.map((w) => (
          <p key={w.address}> {w.address}</p>
        ))}
      </div>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDisconnect } from "wagmi";

export const AllWallets = () => {
  const { ready, linkWallet, linkEmail, login } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();
  const { disconnect } = useDisconnect();

  if (!ready || wallets.length == 0) return null;
  console.log("wallets", wallets);
  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-lg font-bold">Wallets</h2>
      {wallets.map((w) => (
        <div
          key={w.address}
          className="flex flex-row gap-2 w-full items-center"
        >
          <div className="flex-1">
            <p> {w.address}</p>
          </div>
          <div>
            {w.linked && w.connectorType != "embedded" ? (
              <Button size="sm" variant="secondary" onClick={() => w.unlink()}>
                Unlink
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            )}
          </div>
        </div>
      ))}
      {/* <Button size="sm" variant="secondary" onClick={() => linkWallet()}>
        link{" "}
      </Button> */}
    </div>
  );
};

import { getSdkError } from "@walletconnect/utils";
import { X } from 'lucide-react';
import { useCallback } from "react";
import { useWalletKit } from "./context/WalletKitContext";
import { Button } from "./ui/button";
const SessionCard = ({ session }: { session: any }) => {
  const { walletKit } = useWalletKit();

  const disconnectSession = useCallback(
    async (topic: string) => {
      if (!walletKit) return;
      await walletKit.disconnectSession({
        topic,
        reason: getSdkError("USER_DISCONNECTED"),
      });
    },
    [walletKit]
  );

  return (
    <div
      key={session.topic}
      className="flex items-center justify-between gap-4 p-4 rounded-lg border"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {session.peer.metadata.icons?.[0] ? (
            <img
              src={session.peer.metadata.icons[0]}
              alt={session.peer.metadata.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-xl">
              {session.peer.metadata.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {session.peer.metadata.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {session.peer.metadata.url}
          </span>
        </div>
      </div>
      <Button variant="outline" size="icon" onClick={() => disconnectSession(session.topic)}   title="Disconnect" className="hover:text-red-500 transition-colors rounded-full">
        <X fill="currentColor" />
      </Button>
    </div>
  );
};

export const WalletConnectSessions = () => {
  const { sessions } = useWalletKit();

  return (
    <div className="flex flex-col gap-4">
      {sessions &&
        Object.values(sessions).map((session) => (
          <SessionCard key={session.topic} session={session} />
        ))}
    </div>
  );
};

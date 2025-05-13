import { getSdkError } from "@walletconnect/utils";
import { useCallback } from "react";
import { useWalletKit } from "./context/WalletKitContext";

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
      className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
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
          <span className="font-medium text-gray-900">
            {session.peer.metadata.name}
          </span>
          <span className="text-sm text-gray-500">
            {session.peer.metadata.url}
          </span>
        </div>
      </div>
      <button
        onClick={() => disconnectSession(session.topic)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        title="Disconnect"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
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

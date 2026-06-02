import { useState, useCallback } from "react";
import TopDock from "./components/TopDock";
import ChannelSidebar from "./components/ChannelSidebar";
import Lobby from "./components/Lobby";
import StreamingGrid from "./components/StreamingGrid";
import { TooltipProvider } from "@/components/ui/tooltip";

/** Session state after a successful lobby join */
interface SessionInfo {
  token: string;
  room: string;
  identity: string;
}

export default function App() {
  const [session, setSession] = useState<SessionInfo | null>(null);

  const handleJoin = useCallback(
    (token: string, room: string, identity: string) => {
      setSession({ token, room, identity });
    },
    []
  );

  const handleDisconnect = useCallback(() => {
    setSession(null);
  }, []);

  return (
    <TooltipProvider>
      <section
        id="app-shell"
        className="flex flex-col h-screen w-screen bg-surface-darkest overflow-hidden"
      >
        <TopDock />
        <section className="flex flex-1 min-h-0">
          <ChannelSidebar />
          {session ? (
            <StreamingGrid
              token={session.token}
              room={session.room}
              identity={session.identity}
              onDisconnect={handleDisconnect}
            />
          ) : (
            <Lobby onJoin={handleJoin} />
          )}
        </section>
      </section>
    </TooltipProvider>
  );
}

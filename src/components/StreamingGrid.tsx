import { useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { WifiOff, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Reads from VITE_LIVEKIT_URL in your .env file
const LIVEKIT_SERVER_URL = import.meta.env.VITE_LIVEKIT_URL;

interface StreamingGridProps {
  /** JWT token for LiveKit authentication */
  token: string;
  /** Room name to join — maps to a voice channel */
  room: string;
  /** Display identity for this participant */
  identity: string;
  /** Called when the user disconnects from the room */
  onDisconnect?: () => void;
}

type StreamState = "connecting" | "connected" | "error";

export default function StreamingGrid({
  token,
  room,
  identity,
  onDisconnect,
}: StreamingGridProps) {
  const [streamState, setStreamState] = useState<StreamState>("connecting");
  const [error, setError] = useState<string | null>(null);

  return (
    <section
      id="streaming-grid"
      className="flex-1 flex flex-col min-w-0 relative overflow-hidden"
    >
      {/* Background gradient orbs per DESIGN.md */}
      <aside aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cobalt/8 blur-3xl animate-float" />
        <span className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-cobalt-deep/10 blur-3xl animate-float-delayed" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cobalt-glow/5 blur-3xl animate-float-slow" />
      </aside>

      {/* Connection status bar */}
      <header className="flex items-center justify-between px-4 h-10 border-b border-border-subtle bg-surface-darkest/40 backdrop-blur-sm z-10">
        <span className="flex items-center gap-2">
          <Radio
            size={14}
            className={cn(
              streamState === "connected" && "text-status-online",
              streamState === "connecting" && "text-cobalt-glow animate-pulse",
              streamState === "error" && "text-status-dnd"
            )}
          />
          <span className="text-xs font-medium text-text-primary">{room}</span>
          <span className="text-[11px] text-text-muted">
            {streamState === "connected" && "• Live"}
            {streamState === "connecting" && "• Connecting…"}
            {streamState === "error" && "• Disconnected"}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[11px] text-text-muted">{identity}</span>
        </span>
      </header>

      {/* Main content area */}
      <section className="flex-1 z-10 relative">
        {/* Error state */}
        {streamState === "error" && (
          <article className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <figure className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
              <WifiOff size={28} className="text-status-dnd" />
            </figure>
            <p className="text-sm text-text-primary font-medium">Connection Lost</p>
            <p className="text-xs text-text-muted max-w-xs text-center">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDisconnect?.()}
              className="mt-2 border-border-subtle text-text-secondary hover:text-text-primary hover:border-cobalt/40"
            >
              Return to Lobby
            </Button>
          </article>
        )}

        {/* LiveKit Video Conference */}
        {(streamState === "connecting" || streamState === "connected") && token && (
          <LiveKitRoom
            token={token}
            serverUrl={LIVEKIT_SERVER_URL}
            connect={true}
            audio={true}
            video={false}
            data-lk-theme="default"
            className="h-full w-full"
            onConnected={() => setStreamState("connected")}
            onDisconnected={() => {
              setStreamState("error");
              onDisconnect?.();
            }}
            onError={(err) => {
              setError(err?.message || "LiveKit connection error");
              setStreamState("error");
            }}
          >
            <VideoConference />
            <RoomAudioRenderer />
          </LiveKitRoom>
        )}
      </section>
    </section>
  );
}

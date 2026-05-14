import { useState, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2, WifiOff, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Reads from VITE_LIVEKIT_URL in your .env file
const LIVEKIT_SERVER_URL = import.meta.env.VITE_LIVEKIT_URL;

interface StreamingGridProps {
  /** Room name to join — maps to a voice channel */
  room?: string;
  /** Display identity for this participant */
  identity?: string;
}

type ConnectionState = "idle" | "fetching" | "connected" | "error";

export default function StreamingGrid({
  room = "gaming-lounge",
  identity = "JackL",
}: StreamingGridProps) {
  const [token, setToken] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchToken = useCallback(async () => {
    setConnectionState("fetching");
    setError(null);
    try {
      const jwt = await invoke<string>("generate_token", { room, identity });
      setToken(jwt);
      setConnectionState("connected");
    } catch (err) {
      const message = typeof err === "string" ? err : "Failed to generate token";
      setError(message);
      setConnectionState("error");
    }
  }, [room, identity]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

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
              connectionState === "connected" && "text-status-online",
              connectionState === "fetching" && "text-cobalt-glow animate-pulse",
              connectionState === "error" && "text-status-dnd",
              connectionState === "idle" && "text-text-muted"
            )}
          />
          <span className="text-xs font-medium text-text-primary">{room}</span>
          <span className="text-[11px] text-text-muted">
            {connectionState === "connected" && "• Live"}
            {connectionState === "fetching" && "• Connecting…"}
            {connectionState === "error" && "• Disconnected"}
            {connectionState === "idle" && "• Standby"}
          </span>
        </span>
      </header>

      {/* Main content area */}
      <section className="flex-1 z-10 relative">
        {/* Loading state */}
        {connectionState === "fetching" && (
          <article className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Loader2 size={32} className="text-cobalt-glow animate-spin" />
            <p className="text-sm text-text-secondary">Generating secure token…</p>
          </article>
        )}

        {/* Error state */}
        {connectionState === "error" && (
          <article className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <figure className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
              <WifiOff size={28} className="text-status-dnd" />
            </figure>
            <p className="text-sm text-text-primary font-medium">Connection Failed</p>
            <p className="text-xs text-text-muted max-w-xs text-center">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchToken}
              className="mt-2 border-border-subtle text-text-secondary hover:text-text-primary hover:border-cobalt/40"
            >
              Retry Connection
            </Button>
          </article>
        )}

        {/* LiveKit Video Conference */}
        {connectionState === "connected" && token && (
          <LiveKitRoom
            token={token}
            serverUrl={LIVEKIT_SERVER_URL}
            connect={true}
            audio={true}
            video={true}
            data-lk-theme="default"
            className="h-full w-full"
            onDisconnected={() => {
              setConnectionState("idle");
              setToken(null);
            }}
            onError={(err) => {
              setError(err?.message || "LiveKit connection error");
              setConnectionState("error");
            }}
          >
            <VideoConference />
            <RoomAudioRenderer />
          </LiveKitRoom>
        )}

        {/* Idle state — no room selected */}
        {connectionState === "idle" && !token && (
          <article className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <figure className="w-16 h-16 rounded-2xl glass flex items-center justify-center glow-cobalt">
              <Radio size={28} className="text-cobalt-glow" />
            </figure>
            <p className="text-sm text-text-primary font-medium">Ready to Stream</p>
            <p className="text-xs text-text-muted">Select a voice channel to connect</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchToken}
              className="mt-2 border-border-subtle text-text-secondary hover:text-text-primary hover:border-cobalt/40"
            >
              Connect to {room}
            </Button>
          </article>
        )}
      </section>
    </section>
  );
}

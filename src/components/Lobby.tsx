import { useState, type FormEvent } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Shield, Radio, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LobbyProps {
  /** Called when the user successfully authenticates and receives a token */
  onJoin: (token: string, room: string, identity: string) => void;
}

type LobbyState = "idle" | "connecting" | "error";

export default function Lobby({ onJoin }: LobbyProps) {
  const [callSign, setCallSign] = useState("");
  const [sectorCode, setSectorCode] = useState("");
  const [lobbyState, setLobbyState] = useState<LobbyState>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    callSign.trim().length > 0 &&
    sectorCode.trim().length > 0 &&
    lobbyState !== "connecting";

  async function handleJoin(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLobbyState("connecting");
    setError(null);

    try {
      const token = await invoke<string>("generate_token", {
        room: sectorCode.trim(),
        identity: callSign.trim(),
      });
      onJoin(token, sectorCode.trim(), callSign.trim());
    } catch (err) {
      const message =
        typeof err === "string" ? err : "Failed to generate access token";
      setError(message);
      setLobbyState("error");
    }
  }

  return (
    <section
      id="lobby"
      className="flex-1 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient orbs — per DESIGN.md §5.2 */}
      <aside
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <span className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cobalt/8 blur-3xl animate-float" />
        <span className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-cobalt-deep/10 blur-3xl animate-float-delayed" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cobalt-glow/5 blur-3xl animate-float-slow" />
      </aside>

      {/* Lobby card — glass-heavy per DESIGN.md §3.1 (modals, primary shell) */}
      <article className="relative z-10 w-full max-w-sm glass-heavy rounded-2xl glow-cobalt p-8">
        {/* Header */}
        <header className="flex flex-col items-center gap-3 mb-8">
          <figure className="w-14 h-14 rounded-2xl glass flex items-center justify-center glow-cobalt-strong">
            <Shield size={28} className="text-cobalt-glow" />
          </figure>
          <h1 className="text-[15px] font-semibold text-text-primary text-glow">
            Operator Login
          </h1>
          <p className="text-xs text-text-muted text-center max-w-[260px]">
            Enter your call sign and sector code to join the tactical feed.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleJoin} className="flex flex-col gap-4">
          {/* Call Sign field */}
          <fieldset className="flex flex-col gap-1.5">
            <label
              htmlFor="lobby-callsign"
              className="text-[11px] font-semibold tracking-wider uppercase text-text-secondary"
            >
              Call Sign
            </label>
            <Input
              id="lobby-callsign"
              type="text"
              placeholder="e.g. ShadowFox"
              value={callSign}
              onChange={(e) => setCallSign(e.target.value)}
              maxLength={24}
              autoFocus
              className={cn(
                "bg-surface-dark/60 border-border-subtle text-text-primary placeholder:text-text-muted/50",
                "focus-visible:border-border-glow focus-visible:ring-cobalt/20",
                "transition-all duration-200 ease-out"
              )}
            />
          </fieldset>

          {/* Sector Code field */}
          <fieldset className="flex flex-col gap-1.5">
            <label
              htmlFor="lobby-sector"
              className="text-[11px] font-semibold tracking-wider uppercase text-text-secondary"
            >
              Sector Code
            </label>
            <Input
              id="lobby-sector"
              type="text"
              placeholder="e.g. gaming-lounge"
              value={sectorCode}
              onChange={(e) => setSectorCode(e.target.value)}
              maxLength={48}
              className={cn(
                "bg-surface-dark/60 border-border-subtle text-text-primary placeholder:text-text-muted/50",
                "focus-visible:border-border-glow focus-visible:ring-cobalt/20",
                "transition-all duration-200 ease-out"
              )}
            />
          </fieldset>

          {/* Error display */}
          {lobbyState === "error" && error && (
            <aside className="flex items-start gap-2 p-3 rounded-lg bg-status-dnd/10 border border-status-dnd/20">
              <AlertTriangle size={14} className="text-status-dnd mt-0.5 shrink-0" />
              <p className="text-xs text-status-dnd/90">{error}</p>
            </aside>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              "w-full mt-2 h-10 rounded-lg font-semibold text-sm",
              "bg-cobalt hover:bg-cobalt-glow text-white",
              "transition-all duration-200 ease-out",
              "disabled:bg-cobalt-muted disabled:text-text-muted",
              lobbyState === "connecting" && "cursor-wait"
            )}
          >
            {lobbyState === "connecting" ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Establishing Link…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Radio size={16} />
                Enter Sector
              </span>
            )}
          </Button>
        </form>

        {/* Footer hint */}
        <footer className="mt-6 text-center">
          <p className="text-[10px] text-text-muted/60">
            No account required · E2EE secured · Tokens scoped to session
          </p>
        </footer>
      </article>
    </section>
  );
}

import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, Users, Maximize2, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HexAvatar } from "./TopDock";

export default function VideoArea() {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [sharing, setSharing] = useState(false);

  return (
    <main id="video-area" className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cobalt/8 blur-3xl animate-float" />
        <div className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-cobalt-deep/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cobalt-glow/5 blur-3xl animate-float-slow" />
      </div>

      {/* Channel Info Bar */}
      <header className="flex items-center justify-between px-4 h-10 border-b border-border-subtle bg-surface-darkest/40 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Signal size={14} className="text-status-online" />
          <span className="text-xs font-medium text-text-primary">Gaming Lounge</span>
          <span className="text-[11px] text-text-muted">• 3 connected</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-surface-light/50 text-text-muted hover:text-text-secondary transition-colors"><Users size={14} /></button>
          <button className="p-1 rounded hover:bg-surface-light/50 text-text-muted hover:text-text-secondary transition-colors"><Maximize2 size={14} /></button>
        </div>
      </header>

      {/* Video Grid */}
      <div className="flex-1 p-4 z-10 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full max-w-4xl aspect-video">
          {/* Main user feed */}
          <div className="glass-heavy rounded-2xl relative overflow-hidden group col-span-1 row-span-2 glow-cobalt">
            <div className="absolute inset-0 bg-gradient-to-br from-cobalt/8 via-transparent to-cobalt-deep/4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HexAvatar size="lg" glowing>
                <span className="text-base font-bold bg-gradient-to-br from-cobalt to-cobalt-glow bg-clip-text text-transparent">
                  JL
                </span>
              </HexAvatar>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="glass-light px-2.5 py-1 rounded-lg text-xs font-medium text-text-primary">JackL</span>
              <span className="px-1.5 py-1 rounded bg-status-online/20 text-status-online text-[10px] font-semibold">LIVE</span>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 glass-light rounded-lg text-text-secondary hover:text-text-primary"><Maximize2 size={14} /></button>
            </div>
          </div>

          {/* Peer 1 */}
          <div className="glass rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <HexAvatar size="md">
                <span className="text-sm font-bold text-cobalt-glow">S</span>
              </HexAvatar>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className="glass-light px-2 py-0.5 rounded text-[11px] font-medium text-text-secondary">Spectre</span>
            </div>
          </div>

          {/* Peer 2 */}
          <div className="glass rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <HexAvatar size="md">
                <span className="text-sm font-bold text-cobalt-glow">N</span>
              </HexAvatar>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className="glass-light px-2 py-0.5 rounded text-[11px] font-medium text-text-secondary">NightOwl</span>
            </div>
            <div className="absolute top-2 right-2">
              <MicOff size={12} className="text-status-dnd" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div id="control-bar" className="flex items-center justify-center gap-3 px-4 py-3 border-t border-border-subtle bg-surface-darkest/60 backdrop-blur-sm z-10">
        {/* Mute */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              id="mute-btn"
              variant="ghost"
              size="icon"
              onClick={() => setMuted(!muted)}
              className={`rounded-full w-11 h-11 ${muted ? "bg-status-dnd/20 text-status-dnd hover:bg-status-dnd/30" : "glass-light text-text-primary hover:bg-surface-lighter/70"}`}
            >
              {muted ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{muted ? "Unmute" : "Mute"}</TooltipContent>
        </Tooltip>

        {/* Video */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              id="video-btn"
              variant="ghost"
              size="icon"
              onClick={() => setVideoOn(!videoOn)}
              className={`rounded-full w-11 h-11 ${!videoOn ? "bg-status-dnd/20 text-status-dnd hover:bg-status-dnd/30" : "glass-light text-text-primary hover:bg-surface-lighter/70"}`}
            >
              {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{videoOn ? "Turn Off Camera" : "Turn On Camera"}</TooltipContent>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              id="screenshare-btn"
              variant="ghost"
              size="icon"
              onClick={() => setSharing(!sharing)}
              className={`rounded-full w-11 h-11 ${sharing ? "bg-cobalt/15 text-cobalt-glow ring-1 ring-cobalt/40 glow-cobalt" : "glass-light text-text-primary hover:bg-surface-lighter/70"}`}
            >
              <MonitorUp size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{sharing ? "Stop Sharing" : "Share Screen"}</TooltipContent>
        </Tooltip>

        {/* Spacer */}
        <div className="w-px h-6 bg-border-subtle mx-1" />

        {/* End Call */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              id="end-call-btn"
              variant="destructive"
              size="icon"
              className="rounded-full w-11 h-11 bg-status-dnd hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
            >
              <PhoneOff size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Leave Call</TooltipContent>
        </Tooltip>
      </div>
    </main>
  );
}

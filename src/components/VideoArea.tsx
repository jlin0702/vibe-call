import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, Users, Maximize2, Signal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HexAvatar } from "./TopDock";
import { BackgroundOrbs } from "@/components/ui/background-orbs";
import { GlassPanel } from "@/components/ui/glass-panel";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
export default function VideoArea() {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [sharing, setSharing] = useState(false);

  return (
    <main id="video-area" className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
      {/* Background gradient orbs */}
      <BackgroundOrbs />

      {/* Channel Info Bar */}
      <header className="flex items-center justify-between px-4 h-10 border-b border-border-subtle bg-surface-darkest/40 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Signal size={14} className="text-status-online" />
          <span className="text-xs font-medium text-text-primary">Gaming Lounge</span>
          <span className="text-[11px] text-text-muted">• 3 connected</span>
        </div>
        <div className="flex items-center gap-1">
          <IconButton size="sm"><Users size={14} /></IconButton>
          <IconButton size="sm"><Maximize2 size={14} /></IconButton>
        </div>
      </header>

      {/* Video Grid */}
      <div className="flex-1 p-4 z-10 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full max-w-4xl aspect-video">
          {/* Main user feed */}
          <GlassPanel variant="heavy" glow="cobalt" className="group col-span-1 row-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-cobalt/8 via-transparent to-cobalt-deep/4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HexAvatar size="lg" glowing>
                <span className="text-base font-bold bg-gradient-to-br from-cobalt to-cobalt-glow bg-clip-text text-transparent">
                  JL
                </span>
              </HexAvatar>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <GlassPanel as="span" variant="light" rounded="sm" className="px-2.5 py-1 text-xs font-medium text-text-primary">JackL</GlassPanel>
              <Badge variant="online">LIVE</Badge>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconButton variant="glass" size="sm"><Maximize2 size={14} /></IconButton>
            </div>
          </GlassPanel>

          {/* Peer 1 */}
          <GlassPanel variant="default" className="group">
            <div className="absolute inset-0 flex items-center justify-center">
              <HexAvatar size="md">
                <span className="text-sm font-bold text-cobalt-glow">S</span>
              </HexAvatar>
            </div>
            <div className="absolute bottom-2 left-2">
              <GlassPanel as="span" variant="light" rounded="none" className="rounded px-2 py-0.5 text-[11px] font-medium text-text-secondary">Spectre</GlassPanel>
            </div>
          </GlassPanel>

          {/* Peer 2 */}
          <GlassPanel variant="default" className="group">
            <div className="absolute inset-0 flex items-center justify-center">
              <HexAvatar size="md">
                <span className="text-sm font-bold text-cobalt-glow">N</span>
              </HexAvatar>
            </div>
            <div className="absolute bottom-2 left-2">
              <GlassPanel as="span" variant="light" rounded="none" className="rounded px-2 py-0.5 text-[11px] font-medium text-text-secondary">NightOwl</GlassPanel>
            </div>
            <div className="absolute top-2 right-2">
              <MicOff size={12} className="text-status-dnd" />
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Control Bar */}
      <div id="control-bar" className="flex items-center justify-center gap-3 px-4 py-3 border-t border-border-subtle bg-surface-darkest/60 backdrop-blur-sm z-10">
        {/* Mute */}
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton
              id="mute-btn"
              variant={muted ? "dnd" : "glass"}
              size="lg"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <MicOff size={20} /> : <Mic size={20} />}
            </IconButton>
          </TooltipTrigger>
          <TooltipContent side="top">{muted ? "Unmute" : "Mute"}</TooltipContent>
        </Tooltip>

        {/* Video */}
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton
              id="video-btn"
              variant={!videoOn ? "dnd" : "glass"}
              size="lg"
              onClick={() => setVideoOn(!videoOn)}
            >
              {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </IconButton>
          </TooltipTrigger>
          <TooltipContent side="top">{videoOn ? "Turn Off Camera" : "Turn On Camera"}</TooltipContent>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton
              id="screenshare-btn"
              variant={sharing ? "cobalt" : "glass"}
              size="lg"
              onClick={() => setSharing(!sharing)}
            >
              <MonitorUp size={20} />
            </IconButton>
          </TooltipTrigger>
          <TooltipContent side="top">{sharing ? "Stop Sharing" : "Share Screen"}</TooltipContent>
        </Tooltip>

        {/* Spacer */}
        <div className="w-px h-6 bg-border-subtle mx-1" />

        {/* End Call */}
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton
              id="end-call-btn"
              variant="destructive"
              size="lg"
            >
              <PhoneOff size={20} />
            </IconButton>
          </TooltipTrigger>
          <TooltipContent side="top">Leave Call</TooltipContent>
        </Tooltip>
      </div>
    </main>
  );
}

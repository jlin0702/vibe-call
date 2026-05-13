import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, Users, Maximize2, MoreVertical, Signal } from "lucide-react";

export default function VideoArea() {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [sharing, setSharing] = useState(false);

  return (
    <main id="video-area" className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-electric/8 blur-3xl animate-float" />
        <div className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-violet-deep/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-glow/5 blur-3xl animate-float-slow" />
      </div>

      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 h-12 border-b border-border-subtle bg-surface-darkest/40 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Signal size={16} className="text-status-online" />
          <span className="text-sm font-medium text-text-primary">Gaming Lounge</span>
          <span className="text-xs text-text-muted">• 3 participants</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-surface-light/50 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><Users size={16} /></button>
          <button className="p-1.5 rounded hover:bg-surface-light/50 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><Maximize2 size={16} /></button>
          <button className="p-1.5 rounded hover:bg-surface-light/50 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><MoreVertical size={16} /></button>
        </div>
      </header>

      {/* Video Grid */}
      <div className="flex-1 p-4 z-10 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full max-w-4xl aspect-video">
          {/* Main user feed */}
          <div className="glass-heavy rounded-2xl relative overflow-hidden group col-span-1 row-span-2 glow-violet">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-electric/10 via-transparent to-violet-deep/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-electric to-violet-deep flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-electric/30">
                JL
              </div>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="glass-light px-2.5 py-1 rounded-lg text-xs font-medium text-text-primary">JackL</span>
              <span className="px-1.5 py-1 rounded bg-status-online/20 text-status-online text-[10px] font-semibold">LIVE</span>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 glass-light rounded-lg text-text-secondary hover:text-text-primary cursor-pointer"><Maximize2 size={14} /></button>
            </div>
          </div>

          {/* Peer 1 */}
          <div className="glass rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-surface-lighter flex items-center justify-center text-lg font-bold text-violet-glow">S</div>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className="glass-light px-2 py-0.5 rounded text-[11px] font-medium text-text-secondary">Spectre</span>
            </div>
          </div>

          {/* Peer 2 */}
          <div className="glass rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-surface-lighter flex items-center justify-center text-lg font-bold text-violet-glow">N</div>
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
        <button id="mute-btn" onClick={() => setMuted(!muted)}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 cursor-pointer ${muted ? "bg-status-dnd/20 text-status-dnd hover:bg-status-dnd/30" : "glass-light text-text-primary hover:bg-surface-lighter/70"}`}>
          {muted ? <MicOff size={20} /> : <Mic size={20} />}
          <span className="absolute -top-9 glass-light px-2.5 py-1 rounded-lg text-[11px] font-medium text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {muted ? "Unmute" : "Mute"}
          </span>
        </button>

        {/* Video */}
        <button id="video-btn" onClick={() => setVideoOn(!videoOn)}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 cursor-pointer ${!videoOn ? "bg-status-dnd/20 text-status-dnd hover:bg-status-dnd/30" : "glass-light text-text-primary hover:bg-surface-lighter/70"}`}>
          {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
          <span className="absolute -top-9 glass-light px-2.5 py-1 rounded-lg text-[11px] font-medium text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {videoOn ? "Turn Off Camera" : "Turn On Camera"}
          </span>
        </button>

        {/* Screen Share */}
        <button id="screenshare-btn" onClick={() => setSharing(!sharing)}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 cursor-pointer ${sharing ? "bg-violet-electric/20 text-violet-glow ring-1 ring-violet-electric/40 glow-violet" : "glass-light text-text-primary hover:bg-surface-lighter/70"}`}>
          <MonitorUp size={20} />
          <span className="absolute -top-9 glass-light px-2.5 py-1 rounded-lg text-[11px] font-medium text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {sharing ? "Stop Sharing" : "Share Screen"}
          </span>
        </button>

        {/* Spacer */}
        <div className="w-px h-6 bg-border-subtle mx-1" />

        {/* End Call */}
        <button id="end-call-btn"
          className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-status-dnd hover:bg-red-600 text-white transition-all duration-200 cursor-pointer shadow-lg shadow-red-500/20">
          <PhoneOff size={20} />
          <span className="absolute -top-9 glass-light px-2.5 py-1 rounded-lg text-[11px] font-medium text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Leave Call
          </span>
        </button>
      </div>
    </main>
  );
}

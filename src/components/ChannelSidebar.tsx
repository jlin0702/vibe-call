import { useState } from "react";
import { Hash, Volume2, ChevronDown, ChevronRight, Settings, Mic, Headphones, Lock } from "lucide-react";
import { HexAvatar } from "./TopDock";

const categories = [
  {
    name: "INFORMATION",
    channels: [
      { id: "rules", name: "rules", type: "text" as const, locked: true },
      { id: "announcements", name: "announcements", type: "text" as const, locked: true },
    ],
  },
  {
    name: "TEXT CHANNELS",
    channels: [
      { id: "general", name: "general", type: "text" as const },
      { id: "memes", name: "memes", type: "text" as const },
      { id: "clips", name: "clips", type: "text" as const },
    ],
  },
  {
    name: "VOICE CHANNELS",
    channels: [
      { id: "gaming-lounge", name: "Gaming Lounge", type: "voice" as const, users: [
        { name: "Spectre", avatar: "S", status: "online" },
        { name: "NightOwl", avatar: "N", status: "online" },
      ]},
      { id: "ranked-grind", name: "Ranked Grind", type: "voice" as const, users: [
        { name: "PhantomX", avatar: "P", status: "dnd" },
      ]},
      { id: "afk", name: "AFK", type: "voice" as const },
    ],
  },
];

const statusColor: Record<string, string> = {
  online: "bg-status-online",
  idle: "bg-status-idle",
  dnd: "bg-status-dnd",
};

export default function ChannelSidebar() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (n: string) => {
    setCollapsed((p) => { const s = new Set(p); s.has(n) ? s.delete(n) : s.add(n); return s; });
  };

  return (
    <aside id="channel-sidebar" className="glass flex flex-col w-60 min-w-[240px] z-10">
      {/* Server Header */}
      <button id="server-header-btn" className="flex items-center justify-between px-4 h-12 border-b border-border-subtle hover:bg-surface-light/50 transition-colors">
        <h2 className="text-[15px] font-semibold text-text-primary truncate">Vibe Call HQ</h2>
        <ChevronDown size={16} className="text-text-secondary" />
      </button>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {categories.map((cat) => (
          <div key={cat.name}>
            <button onClick={() => toggle(cat.name)} className="flex items-center gap-0.5 px-1 mb-1 w-full text-[11px] font-semibold tracking-wider text-text-muted hover:text-text-secondary transition-colors uppercase">
              {collapsed.has(cat.name) ? <ChevronRight size={10} /> : <ChevronDown size={10} />}
              {cat.name}
            </button>
            {!collapsed.has(cat.name) && cat.channels.map((ch) => (
              <div key={ch.id}>
                <button id={`channel-${ch.id}-btn`} onClick={() => setActiveChannel(ch.id)}
                  className={`group flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-all duration-150 ${activeChannel === ch.id ? "bg-cobalt/10 text-cobalt-glow border-l-2 border-cobalt" : "text-text-muted hover:text-text-secondary hover:bg-surface-light/40"}`}>
                  {ch.type === "text" ? ("locked" in ch && ch.locked ? <Lock size={16} className="shrink-0 text-text-muted" /> : <Hash size={16} className="shrink-0" />) : <Volume2 size={16} className="shrink-0" />}
                  <span className="truncate">{ch.name}</span>
                </button>
                {ch.type === "voice" && ch.users?.map((u) => (
                  <div key={u.name} className="flex items-center gap-2 ml-6 mt-0.5 px-2 py-1 rounded text-xs text-text-secondary">
                    <div className="relative">
                      <HexAvatar size="xs">
                        <span className="text-[8px] font-semibold text-cobalt-glow">{u.avatar}</span>
                      </HexAvatar>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-surface-dark ${statusColor[u.status]}`} />
                    </div>
                    <span className="truncate">{u.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div id="user-panel" className="flex items-center gap-2 px-2 py-2 border-t border-border-subtle bg-surface-darkest/60">
        <div className="relative">
          <HexAvatar size="sm" glowing>
            <span className="text-[10px] font-bold bg-gradient-to-br from-cobalt to-cobalt-glow bg-clip-text text-transparent">JL</span>
          </HexAvatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-status-online border-2 border-surface-darkest" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate leading-tight">JackL</p>
          <p className="text-[10px] text-text-muted leading-tight">Online</p>
        </div>
        <div className="flex items-center gap-0.5">
          <button id="user-mic-btn" className="p-1.5 rounded hover:bg-surface-light/50 text-text-secondary hover:text-text-primary transition-colors"><Mic size={14} /></button>
          <button id="user-headphones-btn" className="p-1.5 rounded hover:bg-surface-light/50 text-text-secondary hover:text-text-primary transition-colors"><Headphones size={14} /></button>
          <button id="user-settings-btn" className="p-1.5 rounded hover:bg-surface-light/50 text-text-secondary hover:text-text-primary transition-colors"><Settings size={14} /></button>
        </div>
      </div>
    </aside>
  );
}

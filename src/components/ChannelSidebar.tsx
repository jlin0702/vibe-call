import { useState } from "react";
import { Hash, Volume2, ChevronDown, ChevronRight, Settings, Mic, Headphones, Lock } from "lucide-react";
import { HexAvatar } from "./TopDock";
import { GlassPanel } from "@/components/ui/glass-panel";
import { IconButton } from "@/components/ui/icon-button";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";

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

function ChannelItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-all duration-150",
        active
          ? "bg-cobalt/10 text-cobalt-glow border-l-2 border-cobalt"
          : "text-text-muted hover:text-text-secondary hover:bg-surface-light/40"
      )}
    >
      {children}
    </button>
  );
}

export default function ChannelSidebar() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (n: string) => {
    setCollapsed((p) => { const s = new Set(p); s.has(n) ? s.delete(n) : s.add(n); return s; });
  };

  return (
    <GlassPanel as="aside" id="channel-sidebar" className="flex flex-col w-60 min-w-[240px] z-10">
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
                <ChannelItem active={activeChannel === ch.id} onClick={() => setActiveChannel(ch.id)}>
                  {ch.type === "text" ? ("locked" in ch && ch.locked ? <Lock size={16} className="shrink-0 text-text-muted" /> : <Hash size={16} className="shrink-0" />) : <Volume2 size={16} className="shrink-0" />}
                  <span className="truncate">{ch.name}</span>
                </ChannelItem>
                {ch.type === "voice" && ch.users?.map((u) => (
                  <div key={u.name} className="flex items-center gap-2 ml-6 mt-0.5 px-2 py-1 rounded text-xs text-text-secondary">
                    <div className="relative">
                      <HexAvatar size="xs">
                        <span className="text-[8px] font-semibold text-cobalt-glow">{u.avatar}</span>
                      </HexAvatar>
                      <StatusDot status={u.status as any} borderContext="dark" />
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
          <StatusDot status="online" size="md" borderContext="darkest" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate leading-tight">JackL</p>
          <p className="text-[10px] text-text-muted leading-tight">Online</p>
        </div>
        <div className="flex items-center gap-0.5">
          <IconButton id="user-mic-btn" size="sm"><Mic size={14} /></IconButton>
          <IconButton id="user-headphones-btn" size="sm"><Headphones size={14} /></IconButton>
          <IconButton id="user-settings-btn" size="sm"><Settings size={14} /></IconButton>
        </div>
      </div>
    </GlassPanel>
  );
}

import { useState } from "react";
import { Plus, Gamepad2, Headphones, Music, Sword, Trophy, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  hasNotification?: boolean;
  mentions?: number;
}

const dockItems: DockItem[] = [
  { id: "home", name: "Home", icon: <Gamepad2 size={18} /> },
  { id: "squad", name: "Squad", icon: <Headphones size={18} />, mentions: 3 },
  { id: "music", name: "Music Lounge", icon: <Music size={18} /> },
  { id: "arena", name: "Arena", icon: <Sword size={18} />, hasNotification: true },
  { id: "ranked", name: "Ranked", icon: <Trophy size={18} /> },
];

function HexAvatar({
  children,
  size = "sm",
  glowing = false,
}: {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  glowing?: boolean;
}) {
  const sizeMap = {
    xs: "w-6 h-7",
    sm: "w-8 h-9",
    md: "w-10 h-11",
    lg: "w-12 h-14",
  };
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow border behind hex */}
      {glowing && (
        <div
          className={`absolute hex-frame bg-gradient-to-br from-cobalt/50 to-cobalt-glow/25 ${sizeMap[size]} scale-115`}
        />
      )}
      <div
        className={`hex-frame flex items-center justify-center bg-surface-mid text-text-primary ${sizeMap[size]}`}
      >
        {children}
      </div>
    </div>
  );
}

export { HexAvatar };

export default function TopDock() {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <nav
      id="top-dock"
      className="glass-heavy flex items-center h-14 px-3 z-30 shrink-0"
    >
      {/* ── Logo ──────────────────────────────────── */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            id="dock-logo-btn"
            onClick={() => setActiveItem("home")}
            className="flex items-center gap-2 mr-4 group"
          >
            <div className="hex-frame w-8 h-9 flex items-center justify-center bg-gradient-to-br from-cobalt to-cobalt-deep text-white text-xs font-black">
              VC
            </div>
            <span className="text-sm font-bold text-text-primary text-glow-sm tracking-tight hidden sm:block">
              VIBE CALL
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Home</TooltipContent>
      </Tooltip>

      {/* ── Divider ───────────────────────────────── */}
      <div className="h-6 w-px bg-border-subtle mx-1" />

      {/* ── Dock Items ────────────────────────────── */}
      <div className="flex items-center gap-1 flex-1">
        {dockItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button
                  id={`dock-${item.id}-btn`}
                  onClick={() => setActiveItem(item.id)}
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-lg
                    transition-all duration-250 ease-out
                    ${isActive
                      ? "bg-cobalt/15 text-cobalt-glow glow-cobalt"
                      : "text-text-muted hover:text-text-secondary hover:bg-surface-light/40"
                    }
                  `}
                >
                  <HexAvatar
                    size="xs"
                    glowing={isActive}
                  >
                    <span className={`${isActive ? "text-cobalt-glow" : ""}`}>
                      {item.icon}
                    </span>
                  </HexAvatar>

                  {/* Bottom active indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-cobalt animate-dock-glow" />
                  )}

                  {/* Notification badge */}
                  {item.mentions && item.mentions > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-status-dnd rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1 border-[1.5px] border-surface-darkest">
                      {item.mentions}
                    </span>
                  )}

                  {/* Notification dot */}
                  {item.hasNotification && !item.mentions && !isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cobalt-glow rounded-full" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{item.name}</TooltipContent>
            </Tooltip>
          );
        })}

        {/* Add Server */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              id="dock-add-btn"
              className="flex items-center justify-center w-10 h-10 rounded-lg text-status-online/70 hover:text-status-online hover:bg-status-online/10 transition-all duration-200"
            >
              <Plus size={18} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Add a Server</TooltipContent>
        </Tooltip>
      </div>

      {/* ── Right: User ───────────────────────────── */}
      <div className="flex items-center gap-2 ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              id="dock-settings-btn"
              className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-light/40 transition-colors"
            >
              <Settings size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Settings</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button id="dock-user-btn" className="relative group">
              <HexAvatar size="sm" glowing>
                <span className="text-[10px] font-bold bg-gradient-to-br from-cobalt to-cobalt-glow bg-clip-text text-transparent">
                  JL
                </span>
              </HexAvatar>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-status-online border-2 border-surface-darkest" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">JackL — Online</TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}

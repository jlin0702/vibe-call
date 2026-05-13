import { useState } from "react";
import { Plus, Gamepad2, Headphones, Music, Sword, Trophy } from "lucide-react";

interface Server {
  id: string;
  name: string;
  icon: React.ReactNode;
  hasNotification?: boolean;
  mentions?: number;
}

const servers: Server[] = [
  { id: "home", name: "Home", icon: <Gamepad2 size={22} />, hasNotification: true },
  { id: "squad", name: "Squad", icon: <Headphones size={22} />, mentions: 3 },
  { id: "music", name: "Music Lounge", icon: <Music size={22} /> },
  { id: "arena", name: "Arena", icon: <Sword size={22} />, hasNotification: true },
  { id: "ranked", name: "Ranked", icon: <Trophy size={22} /> },
];

export default function ServerSidebar() {
  const [activeServer, setActiveServer] = useState("home");

  return (
    <aside
      id="server-sidebar"
      className="glass-heavy flex flex-col items-center w-[72px] min-w-[72px] py-3 gap-2 z-20"
    >
      {/* ── Logo / Home ─────────────────────────── */}
      <button
        id="server-home-btn"
        onClick={() => setActiveServer("home")}
        className={`
          group relative flex items-center justify-center w-12 h-12 rounded-2xl
          transition-all duration-300 ease-out cursor-pointer
          ${activeServer === "home"
            ? "bg-violet-electric rounded-xl glow-violet-strong"
            : "bg-surface-mid hover:bg-violet-electric/20 hover:rounded-xl"
          }
        `}
      >
        <span className="text-lg font-black tracking-tighter text-text-primary">VC</span>

        {/* Active indicator pill */}
        <span
          className={`
            absolute left-[-16px] w-1 rounded-r-full bg-text-primary transition-all duration-300
            ${activeServer === "home" ? "h-10" : "h-0 group-hover:h-5"}
          `}
        />

        {/* Tooltip */}
        <span className="absolute left-[calc(100%+12px)] glass-light px-3 py-1.5 rounded-lg text-sm font-medium text-text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
          Home
        </span>
      </button>

      {/* ── Divider ──────────────────────────────── */}
      <div className="w-8 h-[2px] bg-border-subtle rounded-full my-1" />

      {/* ── Server List ──────────────────────────── */}
      <div className="flex flex-col items-center gap-2 flex-1 overflow-y-auto w-full px-3">
        {servers.slice(1).map((server) => (
          <button
            key={server.id}
            id={`server-${server.id}-btn`}
            onClick={() => setActiveServer(server.id)}
            className={`
              group relative flex items-center justify-center w-12 h-12 rounded-3xl
              transition-all duration-300 ease-out cursor-pointer
              ${activeServer === server.id
                ? "bg-violet-electric rounded-xl glow-violet-strong text-white"
                : "bg-surface-mid hover:bg-violet-electric/20 hover:rounded-xl text-text-secondary hover:text-violet-glow"
              }
            `}
          >
            {server.icon}

            {/* Active indicator pill */}
            <span
              className={`
                absolute left-[-4px] w-1 rounded-r-full bg-text-primary transition-all duration-300
                ${activeServer === server.id ? "h-10" : "h-0 group-hover:h-5"}
              `}
            />

            {/* Notification badge */}
            {server.mentions && server.mentions > 0 && (
              <span className="absolute -bottom-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1 border-2 border-surface-darkest">
                {server.mentions}
              </span>
            )}

            {/* Notification dot */}
            {server.hasNotification && !server.mentions && activeServer !== server.id && (
              <span className="absolute left-[-4px] w-2 h-2 bg-text-primary rounded-full" />
            )}

            {/* Tooltip */}
            <span className="absolute left-[calc(100%+12px)] glass-light px-3 py-1.5 rounded-lg text-sm font-medium text-text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
              {server.name}
            </span>
          </button>
        ))}
      </div>

      {/* ── Add Server ───────────────────────────── */}
      <div className="w-8 h-[2px] bg-border-subtle rounded-full my-1" />
      <button
        id="add-server-btn"
        className="group relative flex items-center justify-center w-12 h-12 rounded-3xl bg-surface-mid hover:bg-status-online/20 hover:rounded-xl transition-all duration-300 text-status-online cursor-pointer"
      >
        <Plus size={22} />
        <span className="absolute left-[calc(100%+12px)] glass-light px-3 py-1.5 rounded-lg text-sm font-medium text-text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
          Add a Server
        </span>
      </button>
    </aside>
  );
}

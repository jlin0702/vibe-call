import TopDock from "./components/TopDock";
import ChannelSidebar from "./components/ChannelSidebar";
import StreamingGrid from "./components/StreamingGrid";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <section id="app-shell" className="flex flex-col h-screen w-screen bg-surface-darkest overflow-hidden">
        <TopDock />
        <section className="flex flex-1 min-h-0">
          <ChannelSidebar />
          <StreamingGrid />
        </section>
      </section>
    </TooltipProvider>
  );
}

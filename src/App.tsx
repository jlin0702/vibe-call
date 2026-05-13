import TopDock from "./components/TopDock";
import ChannelSidebar from "./components/ChannelSidebar";
import VideoArea from "./components/VideoArea";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <div id="app-shell" className="flex flex-col h-screen w-screen bg-surface-darkest overflow-hidden">
        <TopDock />
        <div className="flex flex-1 min-h-0">
          <ChannelSidebar />
          <VideoArea />
        </div>
      </div>
    </TooltipProvider>
  );
}

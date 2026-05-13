import ServerSidebar from "./components/ServerSidebar";
import ChannelSidebar from "./components/ChannelSidebar";
import VideoArea from "./components/VideoArea";

export default function App() {
  return (
    <div id="app-shell" className="flex h-screen w-screen bg-surface-darkest overflow-hidden">
      <ServerSidebar />
      <ChannelSidebar />
      <VideoArea />
    </div>
  );
}

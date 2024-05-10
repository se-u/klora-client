import { Navigate, Outlet } from "react-router-dom";
import BottomNav from "../components/app/BottomNav";
import TopBar from "../components/app/TopBar";

function AppLayout({ connected }: { connected: boolean }) {
  if (!connected) {
    console.log('TODO: return <Navigate to="/" replace />;');
  }
  return (
    <div className="bg-primary-900 w-screen h-screen font-dmsans">
      <div className="relative bg-white  max-w-sm mx-auto h-screen">
        <div className="overflow-y-scroll h-screen">
          <TopBar />
          <div className="px-3 py-4">
            <Outlet />
          </div>
          <div className="invisible">
            <BottomNav />
          </div>
        </div>
        <div className="absolute bottom-0 z-50 w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

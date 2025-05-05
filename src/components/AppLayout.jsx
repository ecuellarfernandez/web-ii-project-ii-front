import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { getPageBackgroundClass } from '../utils/backgrounds';
import PlayerBar from './PlayerBar';

const AppLayout = () => {
  const location = useLocation();
  const bgClass = getPageBackgroundClass(location.pathname);

  return (
    <div className="flex h-screen bg-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className={`flex-1 overflow-y-auto p-6 ${bgClass}`}>
          <Outlet />
        </main>
        <PlayerBar />
      </div>
    </div>
  );
};

export default AppLayout;
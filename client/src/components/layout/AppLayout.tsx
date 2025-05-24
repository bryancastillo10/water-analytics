import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';

import { setIsSidebarExpanded } from '@/lib/redux/states/sidebarSlice';
import { setIsDarkMode } from '@/lib/redux/states/themeSlice';

import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import Drawer from '@/components/navigation/Drawer';

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const isSidebarExpanded = useAppSelector(state => state.sidebar.isSidebarExpanded);

  const toggleSidebar = () => {
    dispatch(setIsSidebarExpanded(!isSidebarExpanded));
  };

  const theme = useAppSelector(state => state.theme.isDarkMode);

  const toggleTheme = () => {
    dispatch(setIsDarkMode(!theme));
  };

  return (
    <main
      className={`flex ${theme ? 'bg-dark text-light' : 'bg-light text-dark'} overflow-x-auto  duration-500 ease-in-out w-full h-screen`}
    >
      <Sidebar isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} theme={theme} />
      <div className="flex-1 flex flex-col md:pl-12 xl:pl-0">
        <Navbar
          isSidebarExpanded={isSidebarExpanded}
          theme={theme}
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
        />
        <section className="flex-1 overflow-auto py-3 px-6">
          <Drawer />
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default AppLayout;

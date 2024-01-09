import Sidebar from 'components/Dashboard/Sidebar';
import Footer from 'components/Footer';
import { Loader } from 'components/Loader';
import { UserContext } from 'contexts/users';
import { ReactNode, useContext } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="text-black dark:text-white dark:bg-[#16161a]">
      <Sidebar />
      <div className="">{children}</div>
    </div>
  );
}

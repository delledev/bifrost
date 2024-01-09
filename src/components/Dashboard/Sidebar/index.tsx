import Navbar from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';

import { useState, useCallback, useEffect, useContext } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'next-i18next';
import LangMenu from '../../Navbar/LangMenu';
import Typography from 'components/UI/Typography';
import Moon from 'assets/home/Moon';
import Sun from 'assets/home/Sun';
import { UserContext } from 'contexts';
import { Divide } from 'tabler-icons-react';
import { Button, Divider } from '@mui/material';
import { IconArrowsDiff, IconEye, IconSend } from '@tabler/icons-react';

const Sidebar = () => {
  const [theme, setTheme] = useState('dark');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentUser }: any = useContext(UserContext);
  const { t } = useTranslation('common');

  const updateTheme = useCallback((theme) => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setTheme(theme);
  }, []);

  useEffect(() => {
    updateTheme(localStorage.theme || theme);
  }, [updateTheme, theme]);

  const handleClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleLight = useCallback(() => {
    updateTheme('light');
    localStorage.theme = 'light';
  }, [updateTheme]);

  const handleDark = useCallback(() => {
    updateTheme('dark');
    localStorage.theme = 'dark';
  }, [updateTheme]);
  const navigationConfig = [
    {
      id: 'dashboard',
      path: '/dashboard',
      title: 'Dashboard',
      icon: IconEye,
    },
    {
      id: 'send',
      path: '/send',
      title: 'Send',
      icon: IconSend,
    },
    {
      id: 'swap',
      path: '/swap',
      title: 'Swap',
      icon: IconArrowsDiff,
    },
  ];

  const router = useRouter();
  const isActive = (path: string) => {
    if (router.pathname === path) {
      return 'text-[#00a3f5]';
    } else {
      return 'text-[#cecfd1]';
    }
  };
  return (
    <div className="shadow-2xl m-5  mt-2 rounded-lg bg dark:bg-[#1d1d21] fixed z-10 left-0 top-0 bottom-0  bg-neutral-100 flex flex-col w-[15rem] overflow-y-auto">
      <div className="m-2 rounded-lg p-2 pl-3 flex gap-2 items-center">
        <div className="m-2 rounded-lg p-2 pl-3 flex flex-col gap-8 items-center text-center py-8">
          <div className="flex flex-col gap-3">
            <span className="text-black dark:text-white font-bold text-[20px]">
              BiFrost
            </span>
            <span className="text-black dark:text-white  text-sm">
              Connect an Ethereum wallet to manage your DeFi portfolio
            </span>
          </div>

          <Button 
          className="bg-blue-500  text-xs text-white hover:bg-[#2d2d32] font-semibold px-4 py-3 flex items-center justify-center rounded-lg border">
            <span className='dark:text-white text-black'>
              Connect Wallet
            </span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full my-2">
        {navigationConfig.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`mx-2 rounded-lg text-black dark:text-white hover:text-white flex gap-3 h-12 items-center pl-4 pr-3 cursor-pointer hover:bg-[#2d2d32] ${isActive(
                item.path
              )}`}
            >
              <div>
                <item.icon size={24} stroke={1.5} />
              </div>

              <span className="text-sm font-semibold">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto flex justify-center self-center items-center p-[10px]">
        {theme === 'dark' ? (
          <Moon onClick={handleLight} className="cursor-pointer mr-3" />
        ) : (
          <Sun onClick={handleDark} className="cursor-pointer mr-3" />
        )}
        <LangMenu />
      </div>
    </div>
  );
};

export default Sidebar;

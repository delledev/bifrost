import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BankAccount, Transaction, User } from 'libs/types/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'react-feather';
import FormatCurrency from 'utils/formatters/currencyFormatters';
import { Route, Routes } from 'react-router-dom';
import TransactionHistory from 'components/Dashboard/PageContainer/TransactionHistory';
import CampaignSlider from '../PageContainer/CampaignSlider';
import PageBody from '../PageContainer';
import getAllTransactions, {
  GetTransactionsResponse,
} from 'utils/apimiddleware/getAllTransactions';
import { Modal } from '@material-ui/core';
import { QRCodeSVG } from 'qrcode.react';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import { color } from 'framer-motion';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { border } from '@chakra-ui/react';
type ProfileContainerProps = {
  currentUser: User;
};

const ProfileContainer: React.FC<ProfileContainerProps> = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isLoading = true;
  const { t } = useTranslation('dashboard');
  const tabConfig = [
    {
      name: t('Portfolio'),
      value: 'portfolio',
    },
    {
      name: t('TransactionHistory'),
      value: 'history',
    },
  ];

  const [QrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [tab, setTab] = useState(tabConfig[0].value);
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    getAllTransactions(localStorage.getItem('token'))
      .then()
      .then((response: GetTransactionsResponse) => {
        if (response.success) {
          setTransactions(response.transactions);
          console.log(transactions);
        } else {
          alert('Failed to fetch transactions.');
        }
      });
  }, []);
  const mainBankAccount: BankAccount = currentUser?.bankAccounts[0];
  let totalBalance_TL = 0;
  currentUser.bankAccounts.forEach((account) => {
    totalBalance_TL += account?.balance;
  });

  const copyIBAN = () => {
    console.log(currentUser);
    const mainBankAccountIBAN = mainBankAccount.iban;
    navigator.clipboard.writeText(String(mainBankAccountIBAN));
    alert(String(mainBankAccountIBAN));
    //alert("Kullanıcı adı kopyalandı!");
  };

  const Logout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    router.reload();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Modal
        open={QrCodeModalOpen}
        onClose={() => setQrCodeModalOpen(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="flex m-auto left-1/2 top-1/2 bg-transparent h-auto w-auto">
          <QRCodeSVG
            value={mainBankAccount?.iban}
            level="H"
            includeMargin={false}
            size={256}
          ></QRCodeSVG>
        </div>
      </Modal>
      <div className="w-full max-w-[960px] shadow-lg    dark:bg-[#1d1d21] rounded-[12px] mx-auto px-3.5  box-border block mt-4">
        <div className="h-6 w-auto"></div>
        <div className="grid grid-flow-col grid-cols-new gap-0 items-start  justify-between box-border">
          <div className="grid grid-flow-col grid-cols-new gap-5 items-start justify-start">
            <div className="rounded-2xl w-[104px] h-[104px] relative">
              <img
                className="w-full h-full object-cover object-center block rounded-xl"
                src="/svg/profile.png"
              />
            </div>
            <div className="grid gap-1 grid-cols-new">
              <div className=" grid-flow-col auto-cols-new gap-1 items-center justify-start h-6 flex ">
                <span className="block font-graphik text-xl leading-6 font-medium  text-black dark:text-[#ffffff] tracking-tighter text-current whitespace-nowrap">
                  {' '}
                  {`${currentUser?.firstName} ${currentUser?.lastName}`}
                </span>
                <div className="flex flex-start">
                  <Button color="inherit" onClick={handleClick}>
                    <IconButton color="inherit">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Button>
                </div>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{
                    animationDelay: '',
                  }}
                >
                  <>
                    <MenuList className="w-[250px]">
                      <MenuItem onClick={copyIBAN}>{t('copyIBAN')}</MenuItem>
                      <Divider />

                      <MenuItem onClick={() => setQrCodeModalOpen(true)}>
                        {t('DisplayQRCode')}
                      </MenuItem>
                    </MenuList>
                  </>
                </Menu>
              </div>

              <div>
                <div className="grid mt-1 grid-cols-minmax-auto">
                  <span className="grid font-sans grid-flow-col auto-cols-new gap-4 items-center break-words text-black dark:text-white justify-start text-3xl leading-12 ">
                    {mainBankAccount &&
                      FormatCurrency(
                        mainBankAccount.balance,
                        mainBankAccount.currency
                      )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-flow-col auto-cols-new grid-cols-1fr items-center justify-start">
            <IconButton
              onClick={Logout}
              sx={{
                color: 'black',
                borderRadius: '50%',
              }}
            >
              <LogoutRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="h-2 w-auto"></div>
      </div>

      <div className="mx-auto px-[15p] w-full max-w-[960px] flex-grow">
        <div className=" text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-6 xl:mb-0 top-0 ">
          <ul className="flex flex-wrap -mb-px">
            {/* {pendingTransaction.map((item) => (
    <li key={item.value} onClick={() => setTab(item.value)}>
      <a
        href='#'
        className={`inline-block pb-2 px-2 pt-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
          item.value === tab && 'text-blue-500 !border-blue-500 active'
        }}`}
      >
        {item.name}
      </a>
    </li>
  ))} */}

            {tabConfig.map((item) => (
              <li key={item.value} onClick={() => setTab(item.value)}>
                <a
                  href="#"
                  className={`inline-block pb-2 px-2 pt-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    item.value === tab &&
                    'text-blue-500 !border-blue-500 active'
                  }}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="content">
          {tab === 'portfolio' && <PageBody currentUser={currentUser} />}
          {tab === 'history' && (
            <TransactionHistory transactions={transactions} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;

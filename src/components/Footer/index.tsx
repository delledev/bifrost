import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="flex flex-row justify-center items-center bg-transparent py-5">
      <p className="text-black dark:text-white text-sm m-0">
        © {new Date().getFullYear()} {t('trademark')}
      </p>
    </footer>
  );
};

export default Footer;

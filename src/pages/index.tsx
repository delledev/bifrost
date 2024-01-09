import Head from 'next/head';
import Box from '@material-ui/core/Box';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import Navbar from 'components/Navbar';
import Introduction from 'components/home/Introduction';
import Products from 'components/home/Products';
import Body from 'components/home/Body';
import Investors from 'components/home/Investors';
import Footer from 'components/Footer';

export default function Home() {
  const { t } = useTranslation('home');
  const cardsRef = useRef<HTMLDivElement>(null);
  const test = ['test1', 'test2'];
  return (
    <>
      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>
      <Box className="overflow-x-hidden bg-white-dark dark:bg-black text-white">
        <Navbar />
        <Introduction />
        <Products />
        <Body />
        <Investors />
        <Footer />
      </Box>
    </>
  );
  ('');
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}

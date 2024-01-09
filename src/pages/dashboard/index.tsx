import ProfileContainer from 'components/Dashboard/ProfileContainer';
import Head from 'next/head';
import PageBody from 'components/Dashboard/PageContainer';
import Navbar from 'components/Navbar';
import { UserContext } from 'contexts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'components/Loader';
import Layout from 'components/Layout';
import { Skeleton } from '@mui/material';
import ProfileContainerSkeleton from 'components/Dashboard/Loading';

function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const router = useRouter();
  if (isLoading)
    return (
      <Layout>
        <ProfileContainerSkeleton isLoading={false} />{' '}
      </Layout>
    );

  if (!sessionSet) return router.push('/login').then(router.reload);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col p-0 m-0  dark:bg-[#16161a] ">
        <Head>
          <meta name="description" content={t('siteDescription')} />
          <title>{t('siteTitle')}</title>
        </Head>

        <div className="relative flex flex-1 flex-shrink-0 mt-2">
          <div className="pl-[15rem] w-full pb-[5px] flex flex-col flex-1">
            <div className="grid gap-0 grid-cols-auto p-0 m-0 box-border">
              <ProfileContainer currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dashboard'])),
    },
  };
}

export default Dashboard;

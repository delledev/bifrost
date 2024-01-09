'use strict';
import SignupForm from 'components/Signup/SignupForm';
import SignupDescription from '../../components/Signup/SignupDescription';
import Navbar from 'components/Navbar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Footer from 'components/Footer';
function SignUp() {
  const { t } = useTranslation('signup');

  return (
    <div className="bg-white-dark dark:bg-black">
      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>
      <Navbar />
      <div className="grid md:grid-cols-2">
        <SignupDescription />
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signup'])),
    },
  };
}

export default SignUp;

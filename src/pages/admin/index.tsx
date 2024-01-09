import { useContext, useEffect, useState } from 'react';
import Navbar from 'components/Navbar';
import { User } from 'libs/types/user';
import getAllUsersToObject from 'utils/apimiddlewareAdmin/getAllUsersToObject';
import UsersComponent from 'components/Admin/UsersComponent';
import ApplicationsComponent from 'components/Admin/ApplicationsComponent';
import getAllApplicationsToObject from 'utils/apimiddlewareAdmin/getAllApplicationsToObject';
import { UserContext } from 'contexts';
import { Loader } from 'components/Loader';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Footer from 'components/Footer';

type AdminApplication = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userSince: Date;
  phoneNumber: string;
  totalAssetValueInTRY: number;
};

const AdminPage = () => {
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const [users, setUsers] = useState<User[]>();
  const [applications, setApplications] = useState<AdminApplication[]>();
  const { t } = useTranslation('admin');

  const fetchApplications = async () => {
    return getAllApplicationsToObject(localStorage.getItem('token'))
      .then()
      .then((res) => {
        if (res.success) {
          setApplications(res.allApplications);
        }
        console.log(res?.allApplications);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getAllUsersData = () => {
    return getAllUsersToObject(localStorage.getItem('token'))
      .then()
      .then((res) => {
        if (res.success) {
          setUsers(res.allUsers);
        }
        console.log(res?.allUsers);
      });
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  const requireAdmin = () => {
    if (currentUser?.role !== 'ADMIN') {
      return (
        <div>
          <p>Admin sayfasına erişim izniniz yok.</p>
        </div>
      );
    }

    return (
      <>
        <Head>
          <meta name="description" content={t('siteDescription')} />
          <title>{t('siteTitle')}</title>
        </Head>
        <Box className="bg-white-dark dark:bg-slate-800 h-full overflow-x-hidden">
          <Navbar />
          <div className="mt-32 m-20 bg-transparent">
            <UsersComponent users={users}></UsersComponent>
            <ApplicationsComponent
              applications={applications}
            ></ApplicationsComponent>
          </div>
          <Footer></Footer>
        </Box>
      </>
    );
  };

  return <div>{requireAdmin()}</div>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'admin',
        'cardsPopUpTable',
      ])),
    },
  };
}
export default AdminPage;

'use-state';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Toast from 'components/Toast';
import Spinner from 'components/Spinner';
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ResponseType, UserContextType } from 'interfaces';
import { User } from 'libs/types/user';
import isEmail from 'validator/lib/isEmail';
import { UserContext } from 'contexts';
import { UseIdentify } from 'utils/identification';
import ConstructReference from 'libs/refconstructor';

export interface IError {
  message: string;
  show: boolean;
}

const Login: NextPage = () => {
  const { t } = useTranslation('login');
  const router = useRouter();

  const {
    isLoading,
    setIsLoading,
    setSessionSet,
    sessionSet,
    setCurrentUser,
  }: any = useContext<{} | UserContextType>(UserContext);

  // input state elements
  const [email, setEmail] = useState<string>('');
  const [emaileError, setEmaileError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordeError, setPasswordeError] = useState<boolean>(false);
  const [error, setError] = useState<IError>({
    message: '',
    show: false,
  });

  const hideError = () => {
    setError({ message: '', show: false });
  };

  const handleError = (value: boolean) => {
    if (value === true) return 'border-red-500 border';
  };

  function handleChange(
    e: ChangeEvent<any>,
    setItem: Dispatch<SetStateAction<any>>
  ): void {
    setEmaileError(false);
    setPasswordeError(false);
    setItem(e?.target?.value);
  }

  // auth login
  useEffect(() => {
    if (sessionSet) router.push('/dashboard');
  }, [sessionSet]);

  const sendLogin: FormEventHandler = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    // Inputs verification
    if (email === '' || email == null || !isEmail(email))
      return setEmaileError(true);
    if (password === '' || password == null) return setPasswordeError(true);

    // *****************************************************************
    setIsLoading(true);
    const user: User = {
      id: '',
      identificationString: '',
      firstName: '',
      lastName: '',
      email,
      birthDate: new Date(),
      phoneNumber: '',
      adress: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
        fullAdress: '',
      },
      cards: null,
      bankAccounts: null,
      transactions: null,
      password,
      role: null,
    };

    const res: ResponseType = await UseIdentify(user, 'login');
    setIsLoading(false);

    if (res.success === false) {
      return setError({ message: res.data?.message, show: true });
    } else {
      setCurrentUser(res.data?.user);
      localStorage.setItem('token', res.data?.token);
      setSessionSet(true);
      router.push('/dashboard');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-white-dark dark:bg-slate-900">
      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>

      <Navbar />

      <main className="flex w-full flex-1 flex-col items-center justify-center mt-32 px-20 text-center">
        <div className="bg-indigo-300  dark:bg-slate-950 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-white dark:text-white">BiFrost</span>
            </div>
            <form onSubmit={sendLogin} className="py-10">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2 text-white">
                {t('signIn')}
              </h2>
              <div className="border-2  border-white dark:border-white w-10 inline-block  mb-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <input
                    onChange={(e) => handleChange(e, setEmail)}
                    value={email}
                    type="email"
                    name="email"
                    placeholder={t('email')}
                    className={`bg-gray-100 outline-none flex-1${handleError(
                      emaileError
                    )}`}
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <input
                    onChange={(e) => handleChange(e, setPassword)}
                    value={password}
                    type="password"
                    name="password"
                    placeholder={t('password')}
                    className={`bg-gray-100 outline-none flex-1 ${handleError(
                      passwordeError
                    )}`}
                  />
                </div>
                <div className="flex w-64 mb-5 justify-between">
                  <label className="flex items-center text-xs dark:text-white">
                    <input type="checkbox" name="Remember" className="mr-1" />
                    {t('remember')}
                  </label>
                  <a href="#" className="text-xs dark:text-white">
                    {t('forgotPassword')}
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className=" text-white border-2 border-white  rounded-full px-12 py-2 inline-block font-semibold text-black dark:text-white hover:bg-slate-900 hover:text-white"
                >
                  {isLoading ? <Spinner size="small" /> : t('signInButton')}
                </button>
              </div>
            </form>
          </div>
          <div className="w-2/3 bg-indigo-200 dark:bg-slate-800 text-gray-500 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              {t('signUpTitle')}
            </h2>
            <div className="border-2  border-white w-10 inline-block  mb-2"></div>
            <p className="mb-10 text-white ">{t('signUpDesc')}</p>
            <a
              href={ConstructReference('/signup/')}
              className=" border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-indigo-100 dark:hover:bg-slate-700"
            >
              {t('signUpButton')}
            </a>
          </div>
        </div>
      </main>

      <Toast
        title="Login failed!"
        message={error.message}
        onClose={hideError}
        show={error.show}
        variant="error"
      />
      <Footer />
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
}

export default Login;

import * as React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { useTranslation } from 'next-i18next';
import isEmail from 'validator/lib/isEmail';
import { UserContext } from 'contexts';
import { useRouter } from 'next/router';
import { ResponseType } from 'interfaces';
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from 'libs/types/user';
import { UseIdentify } from 'utils/identification';
import UniversalDatePicker from 'components/FormObjects/UniversalDatePicker';
import ConstructReference from 'libs/refconstructor';
import { getOperatedCountries } from 'libs/db/getOperatedCountries';
import { GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';
import { Adress } from 'libs/types/adress';
import createAccount from 'utils/apimiddleware/createAccount';

interface IOperatedCountries {
  countryCode: String;
  countryEnglish: String;
  countryNative: String;
}
[];
export default function SignupForm({}) {
  const {
    isLoading,
    sessionSet,
    setIsLoading,
    setSessionSet,
    setCurrentUser,
  }: any = useContext(UserContext);
  type OperatedCountries = {
    operatedCountries: [];
  };
  const router = useRouter();
  const [operatedCountries, setOperatedCountries] = useState<OperatedCountries>(
    { operatedCountries: [] }
  );
  const [identificationString, setIdentificationString] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [country, setCountry] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('90');
  const [email, setEmail] = useState<string>('');
  const [emaileError, setEmaileError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [passwordAgainError, setPasswordAgaineError] = useState<boolean>(false);
  const [agrement, setAgrement] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation('signup');

  const fetchCountries = () => {
    return fetch('/api/getOperatedCountries/')
      .then((res) => res.json())
      .then((d) => {
        setOperatedCountries(d);
      });
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  // Input error function
  const handleError = (value: boolean) => {
    if (value === true) return 'border-red-500 border';
  };

  // auth login
  useEffect(() => {
    if (sessionSet) router.push('/dashboard');
  }, [sessionSet]);

  function handleChange(e: any, setItem: Dispatch<SetStateAction<any>>) {
    setEmaileError(false);
    setPasswordError(false);
    setPasswordAgaineError(false);
    setError('');

    if (setItem == setPhoneNumber) {
      setItem(e);
      return;
    }
    if (setItem === setAgrement) {
      setItem(!agrement);
    } else {
      setItem(e.target.value);
    }
  }

  const sendRegistration: FormEventHandler = async (e: any) => {
    e.preventDefault();

    // Inputs verification
    if (email === '' || email == null || !isEmail(email))
      return setEmaileError(true);
    if (password === '' || password == null) return setPasswordError(true);
    if (passwordAgain === '' || passwordAgain == null)
      return setPasswordAgaineError(true);
    if (password !== passwordAgain) {
      setPasswordError(true);
      setPasswordAgaineError(true);
      return;
    }
    // *****************************************************************
    let adress: Adress = {
      country,
      city,
      street: street.replace('\n', ' '),
      postalCode,
      fullAdress: `${street} ${city} ${postalCode} ${country}`.replace(
        '\n',
        ' '
      ),
    };
    setIsLoading(true);
    const user: User = {
      id: undefined,
      identificationString,
      firstName,
      lastName,
      birthDate,
      adress,
      phoneNumber,
      email,
      password,
      cards: [],
      bankAccounts: [],
      transactions: [],
      role: undefined,
    };

    const res: ResponseType = await UseIdentify(user, 'register');

    setIsLoading(false);

    if (res.success === false || res.success === undefined) {
      return setError(
        res.data?.message || 'Please try again, or reload the page.'
      );
    } else {
      //if account creation is sucessful create a bank account with an assoicated debit card
      var token = res.data?.token;
      const { success, message } = await createAccount(
        token,
        'CHECKING',
        'TRY',
        500,
        0,
        true
      );

      setCurrentUser(res.data?.user);
      localStorage.setItem('token', token);
      setSessionSet(true);
      router.push('/dashboard');
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full dark:bg-slate-900 mb-32">
      <form
        onSubmit={sendRegistration}
        className="max-w-md m-auto h-max  mt-32 top-0 bottom-0 left-0 right-0"
      >
        <header className="px-3">
          <h1 className="text-[28px] text-gray-400  font-bold">
            {t('SignupFormHeader')}
          </h1>
          <p className=" text-gray-400 text-base">
            {t('SignupFormHeaderSubtext')}
          </p>
        </header>
        <section className="mt-4 px-3">
          <TextField
            className="mt-2 bg-white"
            label={t('IdentificationString')}
            type="text"
            size="small"
            margin="dense"
            inputProps={{ maxLength: 11 }}
            value={identificationString}
            onChange={(e) => handleChange(e, setIdentificationString)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            required
          />
          <TextField
            className="mt-2 bg-white"
            label={t('FirstName')}
            required
            type="text"
            size="small"
            margin="dense"
            value={firstName}
            onChange={(e) => handleChange(e, setFirstName)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            className="mt-2 bg-white"
            required
            label={t('LastName')}
            type="text"
            size="small"
            margin="dense"
            value={lastName}
            onChange={(e) => handleChange(e, setLastName)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <UniversalDatePicker
            required
            className='bg-white'
            label={t('BirthDate')}
            format="DD/MM/YYYY"
            onChange={(newDate) => {
              setBirthDate(newDate.$d);
            }}
          />
          <div className="mt-2">
            <FormControl
              variant="filled"
              sx={{ minWidth: 120 }}
              size="small"
              margin="dense"
              className="w-3/12 mr-5 bg-white"
            >
              <InputLabel id="countrylabel">{t('AdressCountry')}</InputLabel>
              <Select
                labelId="countrylabel"
                value={country}
                className='bg-white'
                onChange={(e) => handleChange(e, setCountry)}
              >
                {operatedCountries?.operatedCountries?.map(
                  ({ countryCode, countryNative }) => {
                    return (
                      <MenuItem key={countryCode} value={countryCode}>
                        {countryNative}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
            <TextField
              className="w-8/12 mt-4 bg-white"
              label={t('AdressPostalCode')}
              type="text"
              margin="dense"
              size="small"
              value={postalCode}
              onChange={(e) => handleChange(e, setPostalCode)}
            ></TextField>
          </div>
          <TextField
            className="mt-2 bg-white"
            label={t('AdressCity')}
            type="text"
            size="small"
            margin="dense"
            value={city}
            onChange={(e) => handleChange(e, setCity)}
            fullWidth
          ></TextField>
          <TextField
            className="mt-2 bg-white"
            label={t('AdressStreet')}
            type="text"
            size="small"
            margin="dense"
            inputProps={{ maxLength: 50 }}
            multiline
            minRows={2}
            maxRows={2}
            value={street}
            onChange={(e) => handleChange(e, setStreet)}
            fullWidth
          ></TextField>
          <div className="mt-2">
            <ReactPhoneInput
              label={t('Phone')}
              inputClass=' bg-white'
              value={phoneNumber}
              onChange={(e) => handleChange(e, setPhoneNumber)}
              component={TextField}
            />
          </div>
          <TextField
            className={`${handleError(emaileError)} mt-2 bg-white`}
            label={t('Email')}
            type="text"
            size="small"
            margin="dense"
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            className="mt-2 bg-white"
            label={t('Password')}
            type="password"
            size="small"
            margin="dense"
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            className="mt-2 bg-white"
            label={t('PasswordAgain')}
            type="password"
            size="small"
            margin="dense"
            value={passwordAgain}
            onChange={(e) => handleChange(e, setPasswordAgain)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </section>
        <section className="px-3 mt-2">
          <button
            type="submit"
            className="mt-2 bg-gray-700 w-full py-[6px] text-lg rounded-md text-gray-400 font-medium"
          >
            {t('SignupFormSubmitButton')}
          </button>
        </section>
        <a href={ConstructReference('/login/')}>
          <div className="mt-5 mb-3 text-center text-sm text-gray-400">
            {t('AlreadyHaveAnAccount')}
          </div>
        </a>
      </form>
    </div>
  );
}

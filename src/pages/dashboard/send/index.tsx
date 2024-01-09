import React, { useContext, useState } from 'react';
import { UserContext } from 'contexts';
import { BankAccount, emptyAccount } from 'libs/types/user';
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import MenuItemBankAccount from 'components/MakeTransaction/MenuItemBankAccount';
import makeTransaction from 'utils/apimiddleware/makeTransaction';
import Navbar from 'components/Navbar';
import Toast from 'components/Toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

interface IError {
  message: string;
  show: boolean;
}

const SendMoneyPage: React.FC = () => {
  const { t } = useTranslation('makeTransaction');
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const [selectedAccountIBAN, setSelectedAccountIBAN] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [recipientError, setRecipientError] = useState<boolean>(false);
  const bankAccounts: BankAccount[] = currentUser?.bankAccounts;
  const [showSuccessToast, setShowSuccessToast] = useState<IError>({
    message: '',
    show: false,
  });
  const [showErrorToast, setShowErrorToast] = useState<IError>({
    message: '',
    show: false,
  });

  const handleAccountChange = (event: SelectChangeEvent<string>) => {
    setSelectedAccountIBAN(event.target.value);
  };

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleError = (value: boolean) => {
    if (value === true) return 'border-red-500 border';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    const token = localStorage.getItem('token');
    const { success, message } = await makeTransaction(
      token,
      selectedAccountIBAN,
      recipient,
      amount,
      'TRANSFER'
    );
    if (success) {
      setShowSuccessToast({ message: message, show: true });
    } else {
      setShowErrorToast({ message: message, show: true });
    }
    setIsSubmitDisabled(false);
  };

  const hideSuccessToast = () => {
    setShowSuccessToast({ ...showSuccessToast, show: false });
  };

  const hideErrorToast = () => {
    setShowErrorToast({ ...showErrorToast, show: false });
  };

  return (
    <>
      <Head>
        <meta name="description" content={t('siteDescription')} />
        <title>{t('siteTitle')}</title>
      </Head>
      <Navbar />
      <div className="min-h-screen dark:bg-slate-900">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            className="mt-32 text-black dark:text-white"
            variant="h3"
            component="h1"
            gutterBottom
          >
            {t('SendMoneyPage.title')}
          </Typography>
          <form
            className="mt-20 shadow-3xl rounded-[12px] p-1 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2c5364]"
            onSubmit={handleSubmit}
            style={{ width: '24rem' }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="selectAccount">
                    {t('SendMoneyPage.sender')}
                  </InputLabel>
                  <Select
                    labelId="selectAccount"
                    value={selectedAccountIBAN}
                    onChange={handleAccountChange}
                    variant="filled"
                    className="bg-gray-100 outline-none flex-1 hover:bg-gray-300 focus:bg-gray-300"
                  >
                    {bankAccounts?.map((account) => {
                      return (
                        <MenuItem
                          key={account.iban}
                          value={account.iban}
                          className="selected:bg-gray-300"
                        >
                          <MenuItemBankAccount
                            accountNumber={account.accountNumber}
                            iban={account.iban}
                            balance={account.balance}
                            currency={account.currency}
                          />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="recipient"
                  name="recipient"
                  label={t('SendMoneyPage.recipient')}
                  variant="filled"
                  fullWidth
                  value={recipient}
                  onChange={handleRecipientChange}
                  required
                  className={`bg-gray-100 outline-none flex-1 ${handleError(
                    recipientError
                  )}`}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="amount"
                  name="amount"
                  label={t('SendMoneyPage.amount')}
                  variant="filled"
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                  className="bg-gray-100 outline-none flex-1"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="bg-slate-800"
                  type="submit"
                  disabled={isSubmitDisabled}
                  variant="contained"
                  fullWidth
                >
                  {t('SendMoneyPage.sendButton')}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Toast
            show={showSuccessToast.show}
            title="Transaction Successful"
            message={showSuccessToast.message}
            onClose={hideSuccessToast}
            variant="success"
            closeAfter={2000}
          />

          <Toast
            show={showErrorToast.show}
            title="Transaction Failed"
            message={showErrorToast.message}
            onClose={hideErrorToast}
            variant="error"
            closeAfter={2000}
          />
        </Box>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'makeTransaction'])),
    },
  };
}

export default SendMoneyPage;

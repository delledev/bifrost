import TableContainer from '@mui/material/TableContainer';
import { User } from 'libs/types/user';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import Typography from 'components/UI/Typography';
import FormatCurrency from 'utils/formatters/currencyFormatters';
import { Card } from 'libs/types/card';

export const FormatCardNumberPrivate = (cardNumber: String) => {
  const formattedNumber =
    cardNumber.slice(0, 7) + '******' + cardNumber.slice(14);
  return formattedNumber.replace(/\d{4}(?=.)/g, '$& ');
};

export const FormatCardNumberPublic = (cardNumber: String) => {
  return cardNumber.replace(/\d{4}(?=.)/g, '$& ');
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const AdminShowCardsPopup = (props) => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const { t } = useTranslation('cardsPopUpTable');
  console.log(selectedUser);
  useEffect(() => {
    setSelectedUser(props.selectedUser);
  }, [props.selectedUser]);

  const FormatCardAvailableLimitOrBalance = (card: Card) => {
    if (card.type == 'DEBIT') {
      const assoicatedBankAccount = selectedUser.bankAccounts.find(
        (account) => account.id == String(card.associatedBankAccount)
      );
      if (!assoicatedBankAccount) return 'accountNotFound';
      return FormatCurrency(
        assoicatedBankAccount.balance,
        assoicatedBankAccount.currency
      );
    }
    if (card.type == 'CREDIT') {
      return FormatCurrency(card.cardLimit, 'TRY');
    }
    return 'invalidCardType';
  };
  const FormatCardTotalLimit = (card: Card) => {
    if (card.type == 'DEBIT') {
      return '';
    }
    if (card.type == 'CREDIT') {
      return FormatCurrency(card.maxCardLimit, 'TRY');
    }
    return 'invalidCardType';
  };

  if (selectedUser?.cards?.length == 0) {
    return (
      <div className=" flex  m-auto bg-white dark:bg-gray-700 w-3/4 h-4/6 top-1/2 left-1/2 border-l-cod-gray p-10 overflow-scroll-x">
        <Typography variant="h1">{t('NoCardsFound')}</Typography>
      </div>
    );
  }

  return (
    <div className=" flex  m-auto bg-white dark:bg-gray-700 w-3/4 h-4/6 top-1/2 left-1/2 border-l-cod-gray p-10 overflow-scroll-x">
      <TableContainer
        component={Paper}
        className="bg-white dark:bg-gray-600 mt-5 shadow-3xl"
      >
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <Typography variant="h4">{t('CardType')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('CardNumber')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('CardExpire')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">
                  {t('CardAvailableLimitOrBalance')}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('CardTotalLimit')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">
                  {t('CardCanMakeInternetPurchases')}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {selectedUser?.cards?.map((card) => (
              <StyledTableRow key={card.id}>
                <StyledTableCell>
                  <Typography variant="p">{card.type}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">
                    {FormatCardNumberPrivate(card.number)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">
                    {card.expireMonth}/{card.expireYear}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">
                    {FormatCardAvailableLimitOrBalance(card)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">
                    {FormatCardTotalLimit(card)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">
                    {card.allowDigitalTransactions ? (
                      <>{t('Yes')}</>
                    ) : (
                      <>{t('No')}</>
                    )}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminShowCardsPopup;

import Typography from 'components/UI/Typography';
import FormatCurrency from 'utils/formatters/currencyFormatters';
import { useTranslation } from 'next-i18next';

const MenuItemBankAccount = (props) => {
  const { accountNumber, iban, currency } = props;
  const balance = FormatCurrency(props.balance, currency);
  const { t } = useTranslation('makeTransaction');

  return (
    <div className="w-full h-full bg-transparent  flex flex-col">
      <div className="flex mt-4">
        <Typography variant="p">
          {t('SenderAccounts.accountNumber')}:{' '}
        </Typography>
        <Typography variant="p">{accountNumber}</Typography>
      </div>
      <div className="flex mt-4">
        <Typography variant="p">{t('SenderAccounts.IBAN')}: </Typography>
        <Typography variant="p">{printFormat(iban, ' ')}</Typography>
      </div>
      <div className="flex mt-4 mb-4">
        <Typography variant="p">{t('SenderAccounts.balance')}: </Typography>
        <Typography variant="p">{balance}</Typography>
      </div>
    </div>
  );
};

function electronicFormat(iban) {
  var NON_ALPHANUM = /[^a-zA-Z0-9]/g;
  return iban.replace(NON_ALPHANUM, '').toUpperCase();
}

function printFormat(iban, separator) {
  if (typeof separator == 'undefined') {
    separator = ' ';
  }
  var EVERY_FOUR_CHARS = /(.{4})(?!$)/g;
  return electronicFormat(iban).replace(EVERY_FOUR_CHARS, '$1' + separator);
}

export default MenuItemBankAccount;

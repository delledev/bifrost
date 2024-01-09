import FormatCurrency from 'utils/formatters/currencyFormatters';
import { useTranslation } from 'next-i18next';

const MenuItemBankAccount = (props) => {
  const { accountNumber, iban, currency } = props;
  const balance = FormatCurrency(props.balance, currency);
  const { t } = useTranslation('makeTransaction');

  return (
    <div className="w-full h-full bg-transparent  flex flex-col">
      <div className="flex mt-4 px-4">
        <span >
          {t('SenderAccounts.accountNumber')}:{' '}
        </span>
        <span  >{accountNumber}</span>
      </div>
      <div className="flex mt-4 px-4">
        <span  >{t('SenderAccounts.IBAN')}: </span>
        <span  >{printFormat(iban, ' ')}</span>
      </div>
      <div className="flex mt-4 mb-4 px-4">
        <span  >{t('SenderAccounts.balance')}: </span>
        <span  >{balance}</span>
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

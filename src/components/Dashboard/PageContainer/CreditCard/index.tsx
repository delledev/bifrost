import Toast from 'components/Toast';
import { Card } from 'libs/types/card';
import React, { FormEventHandler, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ApplyForCreditCard from 'utils/apimiddleware/applyforCreditCard';
import hasCreditCardApplication from 'utils/apimiddleware/hasCreditCardApplication';
import { useState } from 'react';
import { IError } from 'pages/login';
import FormatCurrency from 'utils/formatters/currencyFormatters';
import CreditCardForm from '../CreditCardComponent';

type CreditCardProps = {
  creditCard: Card;
};

const CreditCard: React.FC<CreditCardProps> = ({ creditCard }) => {
  const { t } = useTranslation('dashboard');
  const [error, setError] = useState<IError>({
    message: '',
    show: false,
  });

  const hideError = () => {
    setError({ message: '', show: false });
  };

  const handleApplyForCreditCard = async (e) => {
    e.preventDefault();
    const hasApplication = await hasCreditCardApplication(
      localStorage.getItem('token')
    );
    if (hasApplication) {
      setError({ message: 'AlreadHasApplication', show: true });
      return;
    }
    const response = await ApplyForCreditCard(localStorage.getItem('token'));
    if (response?.success) {
      setError({ message: 'SuccessfullApplication', show: true });
    } else {
      setError({ message: response?.message, show: true });
    }
  };
  return (
    <div className="flex justify-center">
      <Toast
        title="Error!"
        message={error.message}
        onClose={hideError}
        show={error.show}
        variant="error"
      />
      <div className="h-auto w-auto min-w-[300px] min-h-[340px]  overflow-auto">
        <div className="flex flex-col h-full w-full justify-center items-center h-full">
            {creditCard ? (
              <CreditCardForm creditCard={creditCard}/>
            ) : (
              <>
                {t('MissingCreditCard')}
                <form onSubmit={handleApplyForCreditCard}>
                  <button
                    className="m-4 bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600"
                    type="submit"
                  >
                    {t('ApplyForCreditCard')}
                  </button>
                </form>
                <p className="text-gray-600 text-center m-4">
                  {t('ApplyForCreditCardDescription')}
                </p>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

import React from 'react';
import { useTranslation } from 'react-i18next';

type CurrencyTableProps = {
  currencies: {
    name: string;
    unit: string;
    value: string;
    type: string;
  }[];
};

const CurrencyTable: React.FC<CurrencyTableProps> = ({ currencies }) => {
  const { t } = useTranslation('dashboard');
  return (
    <div className="flex font-sans justify-center">
      <div className="w-[300px] h-[340px] overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">{t('Currency')}</th>
              <th className="py-2 px-4 text-left">{t('CurrencyValue')}</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => (
              <tr
                className=" border dark:even:bg-[#000000] even:bg-white odd:bg-neutral-100 dark:odd:bg-inherit"
                key={index}
              >
                <td className="py-2 px-4 text-left ">{`${currency.unit}/₺`}</td>
                <td className="py-2 px-4 text-left ">{currency.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;

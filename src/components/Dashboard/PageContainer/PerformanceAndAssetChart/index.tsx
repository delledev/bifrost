import { useEffect, useState } from 'react';
import Chart from '../Charts';
import { DonutChart } from '@tremor/react';
import AccountModel, { IAccount } from 'models/accountModel';
import { BankAccount, User } from 'libs/types/user';
import FormatCurrency, {
  GetFormatter,
} from 'utils/formatters/currencyFormatters';
import { useTranslation } from 'react-i18next';
import { PieChart } from '@mui/x-charts';

interface ChartProps {
  currentUser: any;
}

const ChartSection: React.FC<ChartProps> = ({ currentUser }) => {
  const { t } = useTranslation('dashboard');
  const [accountBalances, setAccountBalances] = useState<
    { name: string; sales: number }[]
  >([]);

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        // Assign the bank accounts of the current user to the 'accounts' variable
        const accounts: BankAccount[] = currentUser?.bankAccounts || [];

        // Calculate the total balance for each currency
        const currencyBalances = accounts.reduce(
          (balances: { [currency: string]: number }, account) => {
            if (account.currency && account.balance) {
              balances[account.currency] =
                (balances[account.currency] || 0) + account.balance;
            }
            return balances;
          },
          {}
        );

        // Convert the currency balances into the required format for the pie chart
        const chartData = Object.entries(currencyBalances).map(
          ([currency, balance]) => ({
            name: currency,
            sales: balance,
          })
        );

        // Update the state with the account balances
        setAccountBalances(chartData);
      } catch (error) {
        console.error('Error fetching account balances:', error);
      }
    };

    fetchAccountBalances();
  }, [currentUser]);
  const valueFormatter = (number: number) =>
    `${GetFormatter('TRY')?.format(number).toString()}`;
    console.log(currentUser)
  return (
    <div className="font-sans grid grid-flow-col auto-cols-new gap-[30px] grid-cols-[1fr,300px] items-initial justify-initial">
      <div className="grid gap-[12px] grid-cols-new">
        <div className="grid grid-flow-col auto-cols-new gap-[8px] items-end">
          <div className="block font-graphik text-[24px] text-black dark:text-white leading-28 font-medium tracking-normal ">
            {t('Performance')}
          </div>
        </div>
        <span>
          <div className="flex shadow-inner bg-neutral-100 dark:bg-[#1d1d21] flex-col h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border  dark:border-[#2d2d32]  ">
            <Chart />
          </div>
        </span>
      </div>

      <div className=" grid gap-[12px] grid-cols-new1">
        <div className="block font-graphik text-[24px] text-black dark:text-white leading-28 font-medium tracking-normal text-current">
          {t('Assets')}
        </div>
        <span>
          <div className="flex flex-col shadow-inner items-center w-[300px] bg-neutral-100 dark:bg-[#1d1d21] h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border border-solid dark:border-[#2d2d32]">
          <div className='h-full w-full m-auto'>
            <PieChart
              slotProps={{legend:{hidden: true}}}
              width={350}
              series={[
                {
                  data:[{value:accountBalances[0]?.sales, label:'TRY'},{value:currentUser.ethBalance * 69326.62, label:'ETH (in TRY)'}],
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 15, additionalRadius: -15, color: 'gray' },
                },
              ]}
            />

          </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ChartSection;

import { Transaction, User, emptyTransaction } from 'libs/types/user';
import InfoBox from './Box';
import CampaignSlider from './CampaignSlider';
import ChartSection from './PerformanceAndAssetChart';
import TransactionHistory from './TransactionHistory';
import getAllTransactions from 'utils/apimiddleware/getAllTransactions';
import { useEffect, useState } from 'react';
import { GetTransactionsResponse } from 'utils/apimiddleware/getAllTransactions';

type PageBodyContainerProps = {
  currentUser: User;
};

const PageBody: React.FC<PageBodyContainerProps> = ({ currentUser }) => {
  let token = localStorage.getItem('token');
  const [transactions, setTransactions] = useState<Transaction[]>();
  useEffect(() => {
    getAllTransactions(token)
      .then()
      .then((response: GetTransactionsResponse) => {
        if (response.success) {
          setTransactions(response.transactions);
          console.log(transactions);
        } else {
          alert('Failed to fetch transactions.');
        }
      });
  }, []);
  return (
    <div className="mx-auto px-[15p] w-full max-w-[960px] flex-grow">
      <div className="h-6 w-auto"></div>
      <div className="grid gap-30 grid-cols-new">
        <ChartSection currentUser={currentUser} />
        <InfoBox currentUser={currentUser} />
      </div>
    </div>
  );
};

export default PageBody;

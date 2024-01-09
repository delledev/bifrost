import React, { useState } from 'react';
import { Transaction } from 'libs/types/user';
import { useTranslation } from 'react-i18next';
interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const { t } = useTranslation('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  let currentTransactions: Transaction[] = transactions?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="h-6 w-auto"></div>
      <div className="block font-graphik text-[24px] mb-[12px] text-black dark:text-white leading-28 font-medium tracking-normal ">
        {t('History')}
      </div>
      <div className="dark:border dark:border-gray-500 shadow-xl  border-2 rounded-[12px] text-white dark:text-white">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  dark:text-white-dark text-gray-500 uppercase tracking-wider">
                {t('TableDate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  dark:text-white-dark text-gray-500 uppercase tracking-wider">
                {t('TableDescription')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  dark:text-white-dark text-gray-500 uppercase tracking-wider">
                {t('TableCategory')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium  dark:text-white-dark text-gray-500 uppercase tracking-wider">
                {t('TableAmount')}
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {currentTransactions?.map((transaction) => (
              <tr key={transaction?.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500  dark:text-white-dark ">
                  {String(transaction?.date).replace('T', ' ').split('.')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500  dark:text-white-dark">
                  {transaction?.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500  dark:text-white-dark">
                  {transaction?.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-white-dark">
                  {String(transaction?.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 mb-4">
          <nav className="flex items-center justify-between">
            <div className="flex -space-x-px">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 w-20 border rounded-l-md border-gray-300 text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 dark:text-white cursor-not-allowed'
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                {t('Previous')}
              </button>
              {Array.from(
                {
                  length: Math.ceil(transactions?.length / transactionsPerPage),
                },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                    currentPage === page
                      ? 'text-blue-700 dark:text-white dark:bg-gray-400 bg-blue-100'
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(transactions?.length / transactionsPerPage)
                }
                className={`px-3 py-2  w-20 border rounded-r-md border-gray-300 text-sm font-medium ${
                  currentPage ===
                  Math.ceil(transactions?.length / transactionsPerPage)
                    ? 'text-gray-400 dark:text-white cursor-not-allowed'
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                {t('Next')}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;

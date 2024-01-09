import { Transaction } from 'libs/types/user';

export type GetTransactionsResponse = {
  success: boolean;
  transactions: Transaction[];
};
export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const response = await fetch('/api/transaction/getalltransactions/', {
    method: 'POST',
    headers: headersList,
  });
  if (response.ok) {
    const transactions: Transaction[] = await response.json();
    return { success: true, transactions };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

import { BankAccount } from 'libs/types/user';

export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const response = await fetch('/api/accounts/getallbankaccounts/', {
    method: 'POST',
    headers: headersList,
  });
  if (response.ok) {
    const bankAccounts: BankAccount[] = await response.json();
    return {
      success: true,
      bankAccounts,
    };
  } else {
    const data = await response.json();
    return {
      success: false,
      message: data?.message,
      bankAccounts: undefined,
    };
  }
}

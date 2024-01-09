import getAllBankAccounts from './getAllBankAccounts';

export default async function ApplyForCreditCard(token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  const { success, bankAccounts } = await getAllBankAccounts(token);
  if (!success) {
    return {
      success: false,
      message: 'Failed to get bank accounts.',
    };
  }
  let totalAssetValueInTRY = 0;
  bankAccounts.forEach((bankAccount) => {
    totalAssetValueInTRY += bankAccount.balance;
  });

  const body = {
    totalAssetValueInTRY,
  };

  const response = await fetch('/api/cards/applyForCreditCard', {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const data = await response.json();
    return { success: false, message: data?.message };
  } else {
    const data = await response.json();
    return { success: true, message: data?.message };
  }
}

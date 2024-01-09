export default async function (token, userId) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const body = {
    userId,
  };
  const response = await fetch('/api/admin/getBankAccountsById', {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const data = await response.json();
    return { success: true, bankAccounts: data?.bankAccounts };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

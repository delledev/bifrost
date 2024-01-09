export default async function (
  token,
  cardLimit,
  type,
  processingMethod,
  associatedBankAccount = undefined
) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const body = {
    cardLimit,
    type,
    processingMethod,
    associatedBankAccount,
  };
  const response = await fetch('/api/cards/createnewcard', {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return { success: true };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

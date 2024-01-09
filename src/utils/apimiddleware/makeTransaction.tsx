export default async function (
  token,
  senderAccountIBAN,
  recipientAccountIBAN,
  amount,
  category,
  description = undefined
) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const body = {
    senderAccountIBAN,
    recipientAccountIBAN,
    amount,
    category,
    description,
  };
  const response = await fetch('/api/transaction/maketransaction/', {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    await fetch('/api/users/loguser', {
      method: 'GET',
    });
    return { success: true, message: data?.message };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

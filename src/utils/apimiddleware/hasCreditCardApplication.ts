export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const response = await fetch('/api/cards/checkForCreditCardApplications/', {
    method: 'POST',
    headers: headersList,
  });
  if (response.ok) {
    const data = await response.json();
    if (data?.message == 'Not Found.') {
      return false;
    } else {
      return true;
    }
  } else {
    return null;
  }
}

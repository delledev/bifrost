export default async function (token, applicationId, cardLimit) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const body = { applicationId, limit: cardLimit };
  const response = await fetch('/api/admin/approveCreditCardApplication', {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const data = await response.json();
    return { success: true, card: data?.card };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

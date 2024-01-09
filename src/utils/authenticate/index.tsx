export async function authenticate(token: any) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const response = await fetch(`/api/users/auth`, {
    method: 'POST',
    headers: headersList,
  });
  if (!response.ok) return { data: null, success: response.ok };
  const data: any = await response.json();
  return { data, success: response.ok };
}

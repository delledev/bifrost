export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  const response = await fetch('/api/admin/getAllUsers', {
    method: 'POST',
    headers: headersList,
  });

  if (response.ok) {
    const data = await response.json();
    return { success: true, users: data?.allUsersData };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

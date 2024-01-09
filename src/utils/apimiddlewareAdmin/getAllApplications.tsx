export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  const response = await fetch('/api/admin/getAllApplications', {
    method: 'POST',
    headers: headersList,
  });

  if (response.ok) {
    const data = await response.json();
    return { success: true, applications: data?.applications };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}

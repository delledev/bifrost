export const getOperatedCountries = async () => {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(`/api/getOperatedCountries`, {
      headers: headersList,
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

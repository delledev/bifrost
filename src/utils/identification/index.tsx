import { User } from 'libs/types/user';

export const UseIdentify = async (credentials: User, url: string) => {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };
  const {
    identificationString,
    firstName,
    lastName,
    birthDate,
    adress,
    email,
    password,
  } = credentials;
  let PhoneNumber = credentials.phoneNumber;
  const bodyContent = JSON.stringify({
    identificationString,
    firstName,
    lastName,
    birthDate,
    adress,
    phoneNumber: PhoneNumber,
    email,
    password,
  });
  try {
    const response = await fetch(`/api/users/${url}`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });
    const data = await response.json();
    return { data, success: response.ok };
  } catch (error) {
    return { data: null, success: false };
  }
};

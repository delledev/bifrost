import { BankAccount, User } from 'libs/types/user';
import getlAllUsers from './getlAllUsers';
import getBankAccountsById from './getBankAccountsById';
import getAllCardsById from './getAllCardsById';

export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  //Get users
  const responseUsers = await getlAllUsers(token);
  if (!responseUsers.success) {
    return { success: false, message: responseUsers?.message };
  }

  let users: User[] = responseUsers?.users;
  users.forEach(async (user) => {
    //Get bank accounts
    let bankResponse = await getBankAccountsById(token, user?.id);
    if (bankResponse.success) {
      user.bankAccounts = bankResponse?.bankAccounts;
    } else {
      user.bankAccounts = [];
    }
    //Get cards
    let cardResponse = await getAllCardsById(token, user?.id);
    if (cardResponse.success) {
      user.cards = cardResponse?.cards;
    } else {
      user.cards = [];
    }
  });

  return { success: true, allUsers: users };
}

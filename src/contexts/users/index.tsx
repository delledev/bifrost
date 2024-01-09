import { authenticate } from 'utils/authenticate';
import { createContext, useEffect, useState } from 'react';
import { childrenType, UserContextType } from 'interfaces';
import { BankAccount, Transaction, User } from 'libs/types/user';
import { Card } from 'libs/types/card';

export const UserContext = createContext<UserContextType | {}>({
  isLoading: true,
  sessionSet: false,
  currentUser: undefined,
});

export const UserContextProvider = (props: childrenType) => {
  // *******************************
  const [sessionSet, setSessionSet] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // controlling if user allready logged in on first load
  useEffect(() => {
    // here is the logic for controlling the user session
    async function refreshUser() {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        return setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
      const { data, success }: any = await authenticate(token);
      if (!success) {
        return setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
      //pull bankaccounts
      const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      };
      data.user.bankAccounts = [];
      const responseBankAccounts = await fetch(
        '/api/accounts/getallbankaccounts',
        {
          method: 'POST',
          headers: headersList,
        }
      );
      if (responseBankAccounts.ok) {
        const json = await responseBankAccounts.json();
        const accounts: BankAccount[] = json;
        accounts.forEach((account) => {
          data.user.bankAccounts.push(account);
        });
      }
      //pull cards
      data.user.cards = [];
      const responseCards = await fetch('/api/cards/getallcards', {
        method: 'POST',
        headers: headersList,
      });
      if (responseCards.ok) {
        const json = await responseCards.json();
        const cards: Card[] = json;
        cards.forEach((card) => {
          data.user.cards.push(card);
        });
      }
      //pull transactions
      data.user.transactions = [];
      const responseTransactions = await fetch(
        '/api/transaction/getalltransactions',
        {
          method: 'POST',
          headers: headersList,
        }
      );
      if (responseTransactions.ok) {
        const json = await responseTransactions.json();
        const transactions: Transaction[] = json;
        transactions.forEach((transaction) => {
          data.user.transactions.push(transaction);
        });
      }
      setCurrentUser(data.user);
      setSessionSet(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    refreshUser();
  }, [sessionSet]);

  return (
    <>
      <UserContext.Provider
        value={{
          isLoading,
          sessionSet,
          currentUser,
          setIsLoading,
          setSessionSet,
          setCurrentUser,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

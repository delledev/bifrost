import { BankAccount } from './user';

export type Card = {
  id: string;
  firstName: string;
  lastName: string;
  number: string;
  type: string;
  processingMethod: string;
  expireYear: string;
  expireMonth: string;
  cvv: string;
  allowDigitalTransactions: boolean;
  cardLimit: number;
  maxCardLimit: number;
  associatedBankAccount: BankAccount;
};

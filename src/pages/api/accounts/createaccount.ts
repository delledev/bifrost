import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import {
  generateRandomAccountNumber,
  generateRandomIBAN,
} from 'utils/accounts/generateAccount';
import { BankAccount, Transaction } from 'libs/types/user';
import AccountModel from 'models/accountModel';
import UserModel from 'models/userModel';
import { Types } from 'mongoose';
import TransactionModel from 'models/transactionModel';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    return res.status(401).send(`Cannot ${req.method} at ${req.url}`);
  }

  try {
    await mongoConnect();
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const { ok, _id } = jwtAuth(token);
    if (!ok) {
      return res.status(401).send({ message: 'Invalid token.' });
    }
    const user = await UserModel.findById(_id);

    const { accountType, currency, balance, loan, doCreateCard } = req.body;
    if (!accountType || !currency) {
      return res.status(401).send({ message: 'All fields are required.' });
    }

    const accountNumber = generateRandomAccountNumber();
    const iban = generateRandomIBAN(accountNumber);
    const account = {
      accountNumber,
      accountType,
      balance: balance || 0,
      currency,
      loan: loan || 0,
      iban,
    };
    const savedAccount = await AccountModel.create(account);
    const insertedBankAccountID = new Types.ObjectId(savedAccount._id);
    await UserModel.findByIdAndUpdate(_id, {
      $push: { bankAccounts: insertedBankAccountID },
    });

    const newAccountTransaction = {
      senderAccount: '-1',
      recipientAccount: insertedBankAccountID,
      category: 'TRANSFER',
      description: '',
      amount: balance,
      balanceAfterTransaction: balance,
      date: undefined,
    };

    const insertedTransaction = await TransactionModel.create(
      newAccountTransaction
    );
    await UserModel.findByIdAndUpdate(_id, {
      $push: { bankAccounts: insertedBankAccountID },
    });
    await UserModel.findByIdAndUpdate(_id, {
      $push: { transactions: insertedTransaction },
    });
    return res.status(200).send({ message: 'sucess', insertedBankAccountID });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'failed' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import AccountModel from 'models/accountModel';
import { Transaction } from 'libs/types/user';
import { mongoConnect } from 'libs';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import { BankAccount, User } from 'libs/types/user';
import TransactionModel from 'models/transactionModel';
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `Cannot ${req.method} at ${req.url}.` });
  }
  try {
    await mongoConnect();

    const token = req.headers.authorization.split(' ')[1];
    const { ok, _id } = jwtAuth(token);
    if (!ok) {
      return res.status(401).send({ message: 'Invalid token.' });
    }

    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    const {
      senderAccountIBAN,
      recipientAccountIBAN,
      amount,
      category,
      description,
    } = req.body;
    if (senderAccountIBAN === recipientAccountIBAN) {
      return res
        .status(401)
        .send({ message: 'Sender and target accounts cannot be the same.' });
    }
    if (amount && amount <= 0) {
      return res
        .status(401)
        .send({ message: 'Transfer amount must be bigger than 0.' });
    }
    const senderAccount = await AccountModel.findOne({
      iban: senderAccountIBAN,
    });
    if (!senderAccount) {
      return res.status(401).send({ message: 'Bad request.' });
    }

    const isAuthorized = user.bankAccounts.find((id) => {
      return id == senderAccount.id;
    });
    if (!isAuthorized) {
      return res.status(401).send({ message: 'Unauthorized request.' });
    }
    const recipientAccount = await AccountModel.findOne({
      iban: recipientAccountIBAN,
    });

    if (!recipientAccount) {
      return res.status(404).json({ message: 'Recipient account not found.' });
    }
    if (recipientAccount.currency != senderAccount.currency) {
      return res.status(401).json({ message: 'Currency mismatch.' });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds.' });
    }
    const recipientUser = await UserModel.findOne({
      bankAccounts: recipientAccount?._id,
    });

    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    const senderTransaction: Transaction = {
      id: undefined,
      senderAccount: senderAccount?._id,
      recipientAccount: recipientAccount._id,
      amount: -1 * amount,
      balanceAfterTransaction: senderAccount?.balance,
      category,
      description,
      date: undefined,
    };
    const recipientTransaction = {
      senderAccount: senderAccount?._id,
      recipientAccount: recipientAccount._id,
      amount: amount,
      balanceAfterTransaction: recipientAccount.balance,
      category,
      description,
      date: undefined,
    };
    await senderAccount.save();
    await recipientAccount.save();

    const savedTransaction = await TransactionModel.create(senderTransaction);
    const savedRecTransaction = await TransactionModel.create(
      recipientTransaction
    );
    await recipientUser.transactions.push(savedRecTransaction._id);
    await user.transactions.push(savedTransaction._id);
    await user.save();
    await recipientUser.save();

    res.status(200).json({
      message: 'Transfer success.',
      transactionId: savedTransaction._id,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

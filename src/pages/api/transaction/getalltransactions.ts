import { Transaction } from 'libs/types/user';
import UserModel from 'models/userModel';
import { jwtAuth } from 'libs';
import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import TransactionModel from 'models/transactionModel';

const SECRET_KEY: string = process.env.JWT_SECRET || '';
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    return res.status(401).send(`Cannot ${req.method} at ${req.url}`);
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
    const transactions: Transaction[] = await Promise.all(
      user.transactions.map(async (transaction) => {
        return await TransactionModel.findById(transaction);
      })
    );

    return res.status(200).send(transactions);
  } catch (error) {
    return res.status(500).send(error);
  }
}

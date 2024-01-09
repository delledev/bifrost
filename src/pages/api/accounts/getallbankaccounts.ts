import { jwtAuth, mongoConnect } from 'libs';
import { BankAccount } from 'libs/types/user';
import AccountModel from 'models/accountModel';
import UserModel from 'models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from 'utils/authenticate';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
    const accounts: BankAccount[] = await Promise.all(
      user.bankAccounts.map(async (_id) => {
        return await AccountModel.findById(_id);
      })
    );
    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

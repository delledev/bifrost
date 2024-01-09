import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import { BankAccount } from 'libs/types/user';
import AccountModel from 'models/accountModel';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    return res
      .status(401)
      .send({ message: `Cannot ${req.method} at ${req.url}` });
  }

  try {
    await mongoConnect();
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const { ok, _id } = jwtAuth(token);
    if (!ok) {
      return res.status(401).send({ message: 'Invalid token.' });
    }
    const requser = await UserModel.findById(_id);
    if (!requser) {
      return res.status(404).send({ message: 'User not found.(Sender)' });
    }
    if (requser?.role != 'ADMIN') {
      return res.status(401).send({ message: 'Authorization failed.' });
    }
    const { userId } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const accounts: BankAccount[] = await Promise.all(
      user.bankAccounts.map(async (_id) => {
        return await AccountModel.findById(_id);
      })
    );

    return res.status(200).send({ bankAccounts: accounts });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

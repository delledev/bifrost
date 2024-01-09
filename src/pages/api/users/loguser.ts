import { NextApiRequest, NextApiResponse } from 'next';
import LogUserModel, { ILogUser } from 'models/logUserModel';
import { mongoConnect } from 'libs';
import UserModel from 'models/userModel';
import { BankAccount } from 'libs/types/user';
import AccountModel from 'models/accountModel';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    res.status(400).send({ message: `Cannot ${req.method} at ${req.url}` });
  }
  try {
    await mongoConnect();
    const allUsers = await UserModel.find();

    allUsers.forEach(async (user) => {
      let totalValue = 0;
      let bankAccounts: BankAccount[] = await Promise.all(
        user.bankAccounts.map(async (_id) => {
          return await AccountModel.findById(_id);
        })
      );

      bankAccounts.forEach((bankAccount) => {
        totalValue += bankAccount.balance;
      });

      //if log exists push to snapshot
      const logObject = await LogUserModel.findOne({ userId: user?.id });
      if (logObject) {
        let newSnapshot = {
          totalAssetValue: totalValue,
          date: new Date(),
        };
        logObject?.snapshot?.push(newSnapshot);
        await logObject.save();
      } else {
        //if log does not exists create a snapshot
        let LogUserObject = {
          userId: user?._id,
          snapshot: {
            totalAssetValue: totalValue,
            date: new Date(),
          },
        };
        await LogUserModel.create(LogUserObject);
      }
    });

    return res.status(200).send({ message: 'Success' });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

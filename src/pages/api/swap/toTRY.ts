import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import CreditCardApplicationModel from 'models/creditCardApplicationModel';
import AccountModel from 'models/accountModel';
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
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    
    const bankAccount = await AccountModel.findById(user.bankAccounts[0])
    
    if (!bankAccount) {
      return res.status(404).send({ message: 'No associated bank found.' });
    }
    
    const {fromAmount, toAmount} = req.body
    const ethBalance = user.ethBalance
    if(fromAmount > ethBalance){
        return res.status(401).send({message :'Insufficent balance.'})
    }

    const transaction:any = {
        id: undefined,
        senderAccount: user._id,
        recipientAccount: user._id,
        amount: toAmount,
        balanceAfterTransaction: bankAccount.balance + toAmount,
        category:'SWAP',
        description:`Swapped -${fromAmount}ETH for ${toAmount} TRY.`,
        date: undefined,
    };

    const savedTransaction = await TransactionModel.create(transaction)
    user.ethBalance -= fromAmount

    await user.transactions.push(savedTransaction._id)
    await user.save()
    bankAccount.balance += toAmount
    await bankAccount.save()
    return res.status(200).send({message: 'Swap compeleted successfully.'});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

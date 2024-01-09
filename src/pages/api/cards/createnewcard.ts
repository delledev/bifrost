import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import GenerateCard from 'utils/cards/generateCard';
import { Card } from 'libs/types/card';
import CardModel from 'models/cardModel';
import { Exception } from 'sass';
import { Types } from 'mongoose';

const SECRET_KEY: string = process.env.JWT_SECRET || '';
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
    const { firstName, lastName } = user;
    const {
      bankAccountId,
      cardLimit,
      type,
      processingMethod,
      associatedBankAccount,
    } = req.body;

    if (type == 'DEBIT') {
      const doesCardExist = await CardModel.findOne({
        associatedBankAccount: bankAccountId,
      });
      if (doesCardExist != undefined) {
        return res.status(400).send({
          message: 'A card already exists for specified bank account.',
        });
      }
    }

    const card = GenerateCard(
      firstName,
      lastName,
      cardLimit,
      type,
      processingMethod,
      associatedBankAccount
    );
    const insertedCard = await CardModel.create(card);

    const insertedCardID: Types.ObjectId = new Types.ObjectId(insertedCard._id);

    await UserModel.findByIdAndUpdate(_id, {
      $push: { cards: insertedCardID },
    });
    return res.status(200).send(insertedCard);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

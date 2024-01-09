import { Card } from 'libs/types/card';
import UserModel from 'models/userModel';
import { jwtAuth } from 'libs';
import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import CardModel from 'models/cardModel';
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
      return res.status(401);
    }

    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    const cards: Card[] = await Promise.all(
      user.cards.map(async (_id) => {
        return await CardModel.findById(_id);
      })
    );
    return res.status(200).send(cards);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

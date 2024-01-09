import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import CreditCardApplicationModel from 'models/creditCardApplicationModel';
import GenerateCard from 'utils/cards/generateCard';
import CardModel from 'models/cardModel';
import { Types } from 'mongoose';
import CreditCardApplicationHistoryModel from 'models/creditCardApplicationHistoryModel';

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

    const { applicationId, limit } = req.body;

    if (!applicationId) {
      return res.status(401).send({ message: 'All fields are required.' });
    }

    const application = await CreditCardApplicationModel.findById(
      applicationId
    );
    if (!application) {
      return res.status(404).send({ message: 'Application not found.' });
    }
    const user = await UserModel.findById(application.userId);
    if (!user) {
      return res.status(404).send({
        message: "Could'nt find the user assoicated with the application.",
      });
    }
    const { firstName, lastName } = user;
    const cardObj = GenerateCard(
      firstName,
      lastName,
      limit,
      'CREDIT',
      'MASTERCARD'
    );
    const card = await CardModel.create(cardObj);
    const insertedCardID: Types.ObjectId = new Types.ObjectId(card._id);

    await UserModel.findByIdAndUpdate(user._id, {
      $push: { cards: insertedCardID },
    });

    const creditCardHistory = {
      userId: application.userId,
      userSince: application.userSince,
      totalAssetValueInTRY: application.totalAssetValueInTRY,
      assignedLimit: limit,
      isApproved: true,
    };
    await CreditCardApplicationHistoryModel.create(creditCardHistory);
    await CreditCardApplicationModel.findByIdAndDelete(application._id);

    return res.status(200).send({ message: 'Success', card: card });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import CreditCardApplicationModel from 'models/creditCardApplicationModel';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    return res.status(401).send(`Cannot ${req.method} at ${req.url}`);
  }
  const { totalAssetValueInTRY } = req.body;
  if (!totalAssetValueInTRY) {
    return res.status(400).send({ message: 'All fields are required.' });
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
    const checkApplication = await CreditCardApplicationModel.find({
      userId: _id,
    });
    if (checkApplication.length != 0) {
      return res
        .status(400)
        .send({ message: 'Already existing application found.' });
    }
    const applicationObject = {
      userId: _id,
      userSince: user.createdAt,
      totalAssetValueInTRY,
    };
    const application = await CreditCardApplicationModel.create(
      applicationObject
    );
    return res.status(200).send({ applicationId: application._id });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

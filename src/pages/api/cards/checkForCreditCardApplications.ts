import { mongoConnect } from 'libs';
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtAuth } from 'libs';
import CreditCardApplicationModel from 'models/creditCardApplicationModel';

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

    const applications = await CreditCardApplicationModel.find({ userId: _id });
    if (applications.length == 0) {
      return res.status(200).send({ message: 'Not Found.' });
    } else {
      return res.status(200).send({ message: 'Found.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

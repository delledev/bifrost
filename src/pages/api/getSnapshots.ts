import { jwtAuth, mongoConnect } from 'libs';
import LogUserModel from 'models/logUserModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { Snapshot } from 'libs/types/snapshot';

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
    const logUser = await LogUserModel.findOne({ userId: _id });
    if (!logUser) {
      return res.status(404).send({ message: 'User log not found.' });
    }
    const snapshots = logUser?.snapshot;

    return res.status(200).send({ snapshots });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

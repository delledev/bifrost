import { mongoConnect } from 'libs';
import UserModel from 'models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY: string = process.env.JWT_SECRET || '';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const authorization: any = req.headers.authorization;
  const method = req.method;
  if (method !== 'POST')
    return res.status(401).send({ message: `Cannot ${method} at ${req.url}` });

  try {
    const token: any = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Invalid Token Format',
      });
    }
    const decode: any = jwt.verify(token, SECRET_KEY);
    const { _id }: JwtPayload = decode;
    await mongoConnect();
    const user: any = await UserModel.findOne({ _id });
    if (!user) return res.status(405).send({ message: `User not found!` });
    res.status(200).send({
      message: 'Success',
      user: { ...user._doc, _id: null, password: null },
    });
  } catch (error: any) {
    return res.status(401).send({ message: `${error.message}` });
  }
}

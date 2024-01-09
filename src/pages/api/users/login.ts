import { createToken, encrypt, mongoConnect, pwdCompare } from 'libs';
import UserModel from 'models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method !== 'POST')
    return res.status(401).send({ message: `Cannot ${method} at ${req.url}` });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).send({ message: `All fields are required!` });

  try {
    console.log(email)
    await mongoConnect();
    const user: any = await UserModel.findOne({ email }).select('+password');
    if (!user)
      return res
        .status(405)
        .send({ message: `User with ${email} not exists!` });

    if ((await pwdCompare(password, user?.password)) === false)
      return res.status(401).send({ message: `Invalid email or password!` });

    const token = createToken(user?._id);

    res.status(200).send({
      message: 'Success',
      user: { ...user._doc, _id: null, password: null },
      token,
    });
  } catch (error: any) {
    return res.status(500).send({ message: `${error.message}` });
  }
}

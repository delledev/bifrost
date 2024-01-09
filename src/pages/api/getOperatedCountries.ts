import { mongoConnect } from 'libs';
import OperatedCountriesModel from 'models/operatedCountries';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method !== 'GET')
    return res.status(401).send({ message: `Cannot ${method} at ${req.url}.` });

  try {
    await mongoConnect();
    const operatedCountries = await OperatedCountriesModel.find().select(
      'countryCode, countryNative, countryEnglish'
    );
    if (!operatedCountries)
      return res
        .status(405)
        .send({ message: 'There are no operated countries.' });

    return res.status(200).send({
      operatedCountries,
    });
  } catch (error: any) {
    return res.status(500).send({ message: `${error.message}` });
  }
}

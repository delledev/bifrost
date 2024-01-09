import { models, model, Schema, Types, SchemaTypes, Model } from 'mongoose';

export interface IOperatedCountries {
  countryCode: String;
  countryEnglish: String;
  countryNative: String;
}

const operatedCountriesSchema: Schema = new Schema<IOperatedCountries>(
  {
    countryCode: {
      type: String,
      required: true,
      select: true,
      unique: true,
    },
    countryEnglish: {
      type: String,
      required: true,
      select: true,
      unique: true,
    },
    countryNative: {
      type: String,
      required: true,
      select: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

const OperatedCountriesModel =
  models.OperatedCountries ||
  model('OperatedCountries', operatedCountriesSchema, 'OperatedCountries');

export default OperatedCountriesModel;

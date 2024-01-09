import { Document, Schema, Types, model, models } from 'mongoose';

interface ICreditCardApplication extends Document {
  userId: Types.ObjectId;
  userSince: Date;
  totalAssetValueInTRY: number;
}

const CreditCardApplicationSchema: Schema = new Schema<ICreditCardApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userSince: {
      type: Date,
      required: true,
    },
    totalAssetValueInTRY: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CreditCardApplicationModel =
  models.CreditCardApplication ||
  model(
    'CreditCardApplication',
    CreditCardApplicationSchema,
    'creditCardApplications'
  );

export default CreditCardApplicationModel;

import { Document, Schema, Types, model, models } from 'mongoose';

interface ICreditCardApplicationHistory extends Document {
  userId: Types.ObjectId;
  userSince: Date;
  totalAssetValueInTRY: number;
  assignedLimit: number;
  isApproved: boolean;
}

const CreditCardApplicationSchemaHistory: Schema =
  new Schema<ICreditCardApplicationHistory>(
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
      assignedLimit: {
        type: Number,
        required: false,
      },
      isApproved: {
        type: Boolean,
        required: true,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

const CreditCardApplicationHistoryModel =
  models.CreditCardApplicationHistory ||
  model(
    'CreditCardApplicationHistory',
    CreditCardApplicationSchemaHistory,
    'creditCardApplicationsHistory'
  );

export default CreditCardApplicationHistoryModel;

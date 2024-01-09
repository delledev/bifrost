import { Schema, model, SchemaTypes, models } from 'mongoose';
import { Snapshot } from 'libs/types/snapshot';
export interface ILogUser extends Document {
  userId: string;
  snapshot: Snapshot[];
}

const logUserSchema = new Schema<ILogUser>(
  {
    userId: {
      type: String,
      required: true,
    },
    snapshot: [
      {
        type: SchemaTypes.Mixed,
      },
    ],
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const LogUserModel =
  models.LogUser || model('LogUser', logUserSchema, 'LogUser');

export default LogUserModel;

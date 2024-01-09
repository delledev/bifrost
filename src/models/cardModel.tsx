import { Schema, Types, model, models } from 'mongoose';

const CARD_TYPES = ['DEBIT', 'CREDIT'];
const PROCESSING_METHODS = ['VISA', 'MASTERCARD'];

export interface Card {
  firstName: String;
  lastName: String;
  number: String;
  type: String;
  processingMethod: String;
  expireYear: String;
  expireMonth: String;
  cvv: String;
  allowDigitalTransactions: boolean;
  cardLimit: number;
  maxCardLimit: number;
  associatedBankAccount: Types.ObjectId;
}

const CardModelSchema = new Schema<Card>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 32,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const regex = /^\d{16}$/;
          return regex.test(value);
        },
      },
    },
    type: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (CARD_TYPES.indexOf(value) == -1) return false;
          return true;
        },
        message: 'invalidCardType',
      },
    },
    processingMethod: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (PROCESSING_METHODS.indexOf(value) == -1) return false;
          return true;
        },
        message: 'invalidProcessingMethod',
      },
    },
    expireYear: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const regext = /^\d{4}$/;
          if (!regext.test(value)) return false;
          if (Number(value) <= new Date().getFullYear()) return false;
          return true;
        },
        message: 'invalidExpireYear',
      },
    },
    expireMonth: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const regext = /^\d{2}$/;
          if (!regext.test(value)) return false;
          if (!(Number(value) >= 1 && Number(value) <= 12)) return false;
          return true;
        },
        message: 'invalidExpireMonth',
      },
    },
    cvv: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const regext = /^\d{3}$/;
          if (!regext.test(value)) return false;
          return true;
        },
        message: 'invalidCVV',
      },
    },
    allowDigitalTransactions: {
      type: Boolean,
      required: false,
      default: true,
    },
    cardLimit: {
      type: Number,
      required: true,
      default: -1,
    },
    maxCardLimit: {
      type: Number,
      required: true,
      default: -1,
    },
    associatedBankAccount: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CardModel = models.Card || model('Card', CardModelSchema, 'cards');

export default CardModel;

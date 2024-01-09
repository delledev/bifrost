import { models, model, Schema, Types, SchemaTypes, Document } from 'mongoose';
import { Adress } from 'libs/types/adress';
import moment from 'moment';
import Account from './accountModel';
import {
  generateRandomAccountNumber,
  generateRandomIBAN,
} from 'utils/accounts/generateAccount';
import { createToken } from 'libs';

const ROLES = ['ADMIN', 'DEVELOPER', 'TESTER', 'CUSTOMER'];
export interface IUser extends Document {
  identificationString: String;
  email: String;
  firstName: String;
  lastName: String;
  birthDate: Date;
  phoneNumber: String;
  password: String;
  adress: Adress;
  cards: Types.ObjectId[];
  bankAccounts: Types.ObjectId[];
  transactions: Types.ObjectId[];
  role: String;
  ethBalance:number
}

const userSchema: Schema = new Schema<IUser>(
  {
    identificationString: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          // Identification string'in 11 karakterden oluştuğunu kontrol et
          return value.length === 11;
        },
        message: 'invalidIdentificationString',
      },
    },
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 32,
      index: true,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      maxlength: 32,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // E-posta adresi geçerlilik kontrolü
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return emailRegex.test(value);
        },
        message: 'invalidEmail',
      },
    },
    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return moment().diff(value, 'years') >= 18;
        },
        message: 'mustBeOver18',
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const phoneRegex = /^\d{12}$/;
          return phoneRegex.test(value);
        },
        message: 'invalidPhoneNumber',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    adress: {
      type: SchemaTypes.Mixed,
      required: true,
      select: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Card',
      },
    ],
    bankAccounts: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Account',
      },
    ],
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    role: {
      type: String,
      required: true,
      default: 'CUSTOMER',
      validate: {
        validator: function (value) {
          if (ROLES.indexOf(value) == -1) return false;
          return true;
        },
        message: 'invalidRole',
      },
    },
    ethBalance: {
      type: Number,
      default:0,
      required:true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserModel = models.User || model('User', userSchema, 'users');

export default UserModel;

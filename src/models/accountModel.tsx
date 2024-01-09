import { models, model, Schema } from 'mongoose';

const CURRENCIES = ['USD', 'EUR', 'TRY'];
const ACCOUNT_TYPES = ['SAVING', 'CHECKING', 'MMA', 'CD'];
export interface IAccount {
  accountNumber: String;
  accountType: String;
  balance: Number;
  currency: String;
  loan: Number;
  iban: String;
}

const accountSchema = new Schema<IAccount>(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Account number'ın belirli bir formata uyduğunu kontrol et
          const accountNumberRegex = /^\d{6}$/;
          return accountNumberRegex.test(value);
        },
        message: 'invalidAccountNumber',
      },
    },
    accountType: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (ACCOUNT_TYPES.indexOf(value) == -1) return false;
          return true;
        },
        message: 'invalidAccountType',
      },
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (CURRENCIES.indexOf(value) == -1) return false;
          return true;
        },
        message: 'invalidCurrency',
      },
    },
    loan: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    iban: {
      type: String,
      required: true,
      unique: true,
    },
    // Diğer hesap özellikleri buraya eklenebilir
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AccountModel =
  models.Account || model('Account', accountSchema, 'bankAccounts');

export default AccountModel;

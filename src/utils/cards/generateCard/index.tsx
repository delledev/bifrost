import { Card } from 'libs/types/card';

export default function GenerateCard(
  firstName,
  lastName,
  cardLimit,
  type,
  processingMethod,
  associatedBankAccount = null,
  allowDigitalTransactions = true
) {
  if (!firstName || !lastName || !cardLimit || !type || !processingMethod) {
    return null;
  }
  let bin;
  if (processingMethod == 'MASTERCARD') bin = '53';
  if (processingMethod == 'VISA')
    bin = '4' + String(Math.floor(Math.random() * 8) + 1);

  const expireYear = String(
    new Date().getFullYear() + (Math.floor(Math.random() * 10) + 2)
  );
  let expireMonth = String(Math.floor(Math.random() * 11) + 1);
  if (Number(expireMonth) < 10) {
    expireMonth = `0${expireMonth}`;
  }
  const cvv = `${Math.floor(Math.random() * 8) + 1}${
    Math.floor(Math.random() * 8) + 1
  }${Math.floor(Math.random() * 8) + 1}`;
  const cardNumber = generateValidCard(bin, 16);
  if (type == 'DEBIT') cardLimit = -1;

  const card: Card = {
    id: undefined,
    firstName,
    lastName,
    number: cardNumber,
    type,
    processingMethod,
    expireYear,
    expireMonth,
    cvv,
    allowDigitalTransactions,
    cardLimit,
    maxCardLimit: cardLimit,
    associatedBankAccount,
  };

  return card;
}

const luhnChk = (function (arr) {
  return function (ccNum) {
    var len = ccNum.length,
      bit = 1,
      sum = 0,
      val;

    while (len) {
      val = parseInt(ccNum.charAt(--len), 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };
})([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

function generateValidCard(bin, length) {
  var cardNumber = generate(bin, length),
    luhnValid = luhnChk(cardNumber),
    limit = 100000,
    counter = 0;

  while (!luhnValid) {
    cardNumber = generate(bin, length);
    luhnValid = luhnChk(cardNumber);
    counter++;

    if (counter === limit) {
      cardNumber = luhnValid
        ? cardNumber
        : 'cannot make valid card with given params';
      break;
    }
  }

  return cardNumber;
}

function generate(bin, length) {
  var cardNumber = bin,
    randomNumberLength = length - (bin.length + 1);

  for (var i = 0; i < randomNumberLength; i++) {
    var digit = Math.floor(Math.random() * 9 + 0);
    cardNumber += digit;
  }

  var checkDigit = getCheckDigit(cardNumber);

  cardNumber += String(checkDigit);

  return cardNumber;
}

function getCheckDigit(number) {
  var sum = 0,
    modMa,
    checkDigit;

  for (var i = 0; i < number.length; i++) {
    var digit = parseInt(number.substring(i, i + 1));

    if (i % 2 == 0) {
      digit = digit * 2;
      if (digit > 9) {
        digit = digit / 10 + (digit % 10);
      }
    }
    sum += digit;
  }

  modMa = parseInt(String(sum)) % 10;
  checkDigit = modMa === 0 ? 0 : 10 - modMa;

  return checkDigit;
}

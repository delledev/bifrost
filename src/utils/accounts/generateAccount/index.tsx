export function generateRandomIBAN(accountNumber): string {
  const ibanLength = 26;
  const countryCode = 'TR';
  const bankCode = '00'; // Varsayılan banka kodu
  const characters = '0123456789';
  let iban = '';

  if (accountNumber.length !== 6) {
    throw new Error('Account Number must be 6 characters long.');
  }

  const remainingLength =
    ibanLength - countryCode.length - bankCode.length - accountNumber.length;
  let remainingCharacters = '';
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    remainingCharacters += characters[randomIndex];
  }

  iban = countryCode + bankCode + remainingCharacters + accountNumber;

  return iban;
}

export function generateRandomAccountNumber(): string {
  const accountNumberLength = 6;
  const characters = '0123456789';
  let accountNumber = '';

  for (let i = 0; i < accountNumberLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    accountNumber += characters[randomIndex];
  }

  return accountNumber;
}

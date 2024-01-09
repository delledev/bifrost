import validator from 'validator';

export const validPwd = async (password: string) => {
  const response: any = validator.isStrongPassword(password, {
    minSymbols: 1,
    minLength: 5,
    minUppercase: 1,
    minNumbers: 2,
  });
  return response;
};

export const validEmail = async (email: string) => {
  const response: any = validator.isEmail(email);
  return response;
};

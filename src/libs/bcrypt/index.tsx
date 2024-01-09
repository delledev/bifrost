import bcrypt from 'bcrypt';

export const encrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const crypted: string = await bcrypt.hash(password, salt);
  return crypted;
};

export async function pwdCompare(oldPwd: string, newPwd: string) {
  const result: any = await bcrypt.compare(oldPwd, newPwd);
  return result;
}

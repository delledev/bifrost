import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY: string = process.env.JWT_SECRET || '';

export function jwtAuth(token: any) {
  try {
    const decode: any = jwt.verify(token, SECRET_KEY);
    const { _id }: JwtPayload = decode;
    return { ok: true, _id };
  } catch (error: any) {
    return { ok: false };
  }
}

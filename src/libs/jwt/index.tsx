import jwt from 'jsonwebtoken';
const jwtkey: string = process.env.JWT_SECRET || '';

export const createToken = (_id: string) => {
  if (!jwtkey || jwtkey === '') {
    throw new Error('Internal server error!');
  } else {
    return jwt.sign({ _id }, jwtkey, { expiresIn: '5h' });
  }
};

export function tokenCheck(req: any, res: any, next: any) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      message: 'No Authorization Header',
    });
  }
  try {
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Invalid Token Format',
      });
    }
    const decode = jwt.verify(token, jwtkey);
    req.user = decode;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: 'Session Expired',
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'Invalid Token',
      });
    }
    res.status(500).json({
      message: 'Internal server Error',
    });
  }
}

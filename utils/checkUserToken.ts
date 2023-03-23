import jwt from 'jsonwebtoken';

export function checkUserToken(req) {
  const authorizationHeader = req.headers.authorization || '';

  if (!authorizationHeader) {
    return null;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const verifyToken = jwt.verify(token, process.env.APP_SECRET);

    return verifyToken;
  } catch (error) {
    throw new Error('El token ingresado no es válido');
  }
}

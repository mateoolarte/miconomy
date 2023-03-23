import jwt from 'jsonwebtoken';

export function generateToken(
  value: { userId: string },
  expiresIn: string
): string {
  return jwt.sign(value, process.env.APP_SECRET, {
    expiresIn,
  });
}

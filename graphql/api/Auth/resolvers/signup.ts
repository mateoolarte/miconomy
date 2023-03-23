import bcrypt from 'bcrypt';
import { generateToken } from '@/utils/generateToken';

export async function signupResolver(args, db) {
  const { email, password } = args;

  const userExist = await db.user.findUnique({ where: { email } });

  if (userExist) {
    throw new Error('Este usuario ya existe');
  }

  if (password.length < 8) {
    throw new Error('La contraseña debe ser mayor o igual a 8 caracteres');
  }

  const encryptedPass = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: encryptedPass,
    },
  });
  const token = generateToken({ userId: user.id }, '30 days');

  return {
    user,
    token,
  };
}

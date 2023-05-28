import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { generateToken } from '@/utils/generateToken';

interface SignupArgs {
  email: string;
  password: string;
}

export async function signupResolver(args: SignupArgs, db) {
  const { email, password } = args;

  const userExist = await db.user.findUnique({ where: { email } });

  if (userExist) {
    throw new GraphQLError('Este usuario ya existe');
  }

  if (password.length < 8) {
    throw new GraphQLError(
      'La contraseña debe ser mayor o igual a 8 caracteres'
    );
  }

  const encryptedPass = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: encryptedPass,
    },
  });
  const token = generateToken({ userId: user.id }, '27 days');

  return {
    user,
    token,
  };
}

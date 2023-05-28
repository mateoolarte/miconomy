import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { generateToken } from '@/utils/generateToken';

interface LoginArgs {
  email: string;
  password: string;
}

export async function loginResolver(args: LoginArgs, db) {
  const { email, password } = args;

  const user = await db.user.findUnique({ where: { email } });

  if (!user) throw new GraphQLError('Este usuario no existe');

  const hasValidPassword = await bcrypt.compare(password, user.password);

  if (!hasValidPassword)
    throw new GraphQLError('Valida tu usuario o contraseña');

  const token = generateToken({ userId: user.id }, '27 days');

  return {
    user,
    token,
  };
}

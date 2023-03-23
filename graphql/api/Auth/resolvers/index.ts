import { loginResolver } from './login';
import { signupResolver } from './signup';

export const Auth = {
  login: loginResolver,
  signup: signupResolver,
};

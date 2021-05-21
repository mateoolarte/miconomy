import Cookies from 'universal-cookie';
import { getCookie } from '../utils/cookies';
import { USER_TOKEN_KEY } from '../utils/constants';

interface AuthRes {
  isAuth: boolean;
  token: string;
}

export function checkAuth(context?: any, redirectTo?: string): AuthRes {
  let isAuth;
  let token;
  const cookies = context?.req?.headers?.cookie;

  if (cookies) {
    const cookie = new Cookies(cookies);
    isAuth = cookie.get(USER_TOKEN_KEY) !== undefined;
    token = cookie.get(USER_TOKEN_KEY);
  } else {
    isAuth = getCookie(USER_TOKEN_KEY) !== undefined;
    token = getCookie(USER_TOKEN_KEY);
  }

  if (context && !isAuth) {
    context.res.writeHead(302, {
      Location: redirectTo || '/login',
    });
    context.res.end();
  }

  return { isAuth, token };
}

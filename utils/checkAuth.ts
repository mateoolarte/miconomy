import Cookies from 'universal-cookie';
import { USER_TOKEN_KEY } from '@/constants';
import { getCookie } from './cookies';

interface AuthRes {
  isAuth: boolean;
  token: string;
}

export function checkAuth(context?: any, redirectTo?: string): AuthRes {
  let isAuth: boolean;
  let token: string;
  const cookies = context?.req?.headers?.cookie;

  if (cookies) {
    // server side
    const cookie = new Cookies(cookies);
    isAuth = cookie.get(USER_TOKEN_KEY) !== undefined;
    token = cookie.get(USER_TOKEN_KEY);
  } else {
    // client side
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

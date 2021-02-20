import Cookies from 'universal-cookie';
import { getCookie } from '../utils/cookies';
import { USER_TOKEN_KEY } from '../utils/constants';

export function checkAuth(context?: any, redirectTo?: string): void | boolean {
  let isAuth;
  const cookies = context?.req?.headers?.cookie;

  if (cookies) {
    const cookie = new Cookies(cookies);
    isAuth = cookie.get(USER_TOKEN_KEY) !== undefined;
  } else {
    isAuth = getCookie(USER_TOKEN_KEY) !== undefined;
  }

  if (context && !isAuth) {
    context.res.writeHead(302, {
      Location: redirectTo || '/login',
    });
    context.res.end();
  }

  return isAuth;
}

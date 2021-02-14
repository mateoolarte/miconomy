import Cookies from 'universal-cookie';
import { getCookie } from '../utils/cookies';
import { USER_TOKEN_KEY } from '../utils/constants';

export function checkAuth(cookies?: string | undefined): boolean {
  let isAuth;

  if (cookies) {
    const cookie = new Cookies(cookies);
    isAuth = cookie.get(USER_TOKEN_KEY) !== undefined;
  } else {
    isAuth = getCookie(USER_TOKEN_KEY) !== undefined;
  }

  return isAuth;
}

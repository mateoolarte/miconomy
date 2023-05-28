import { USER_TOKEN_KEY } from '@/constants';
import { getCookie } from './cookies';

interface CheckAuthRes {
  isAuth: boolean;
  token: string | undefined;
}

// Only works in the client side
export function checkAuth(): CheckAuthRes {
  const isAuth: boolean = getCookie(USER_TOKEN_KEY) !== undefined;
  let token: string | undefined = getCookie(USER_TOKEN_KEY);

  return { isAuth, token };
}

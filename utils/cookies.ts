import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setCookie(
  name: string,
  value: string | object,
  expireTime: number
): void {
  cookies.set(name, value, { maxAge: expireTime });
}

export function getCookie(name: string): string | undefined {
  return cookies.get(name);
}

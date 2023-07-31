import { USER_TOKEN_KEY } from "@/constants";
import { getCookie } from "./cookies";

interface CheckAuthRes {
  token: string | undefined;
}

// Only works in the client side
export function checkAuth(): CheckAuthRes {
  let token: string | undefined = getCookie(USER_TOKEN_KEY);

  return { token };
}

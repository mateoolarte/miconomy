import { ReactElement } from 'react';
import Cookies from 'universal-cookie';

import { USER_TOKEN_KEY } from '../utils/constants';

import Login from '../components/Login';

export default function LoginPage(): ReactElement {
  return <Login />;
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const cookie = new Cookies(cookies);
  const isAuth = cookie.get(USER_TOKEN_KEY) !== undefined;

  if (isAuth) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
  }

  return {
    props: {},
  };
}

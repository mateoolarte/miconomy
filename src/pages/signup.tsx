import { ReactElement } from 'react';
import Cookies from 'universal-cookie';

import { USER_TOKEN_KEY } from '../utils/constants';

import { Signup } from '../containers/Signup';

export default function SignupPage(): ReactElement {
  return <Signup />;
}

export async function getServerSideProps(context) {
  const cookies = context?.req?.headers?.cookie;
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

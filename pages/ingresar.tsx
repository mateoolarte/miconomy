import { ReactElement } from 'react';
import Login from '../components/Login';
import { checkAuth } from '../utils/checkAuth';

export default function LoginPage(): ReactElement {
  return <Login />;
}

export async function getServerSideProps(context) {
  const isAuth = checkAuth(context.req.headers.cookie);

  if (isAuth) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

import { ReactElement } from 'react';

import { checkAuth } from '../utils/checkAuth';

export default function Index(): ReactElement {
  return <h1>Hi world</h1>;
}

export async function getServerSideProps(context) {
  checkAuth(context);

  return {
    props: {},
  };
}

import { ReactElement } from 'react';

import { checkAuth } from '../utils/checkAuth';

export default function Index(): ReactElement {
  return <div>Miconomy app</div>;
}

export async function getServerSideProps(context) {
  checkAuth(context);

  return {
    props: {},
  };
}

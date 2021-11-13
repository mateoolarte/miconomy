import { ReactElement } from 'react';
// import { checkAuth } from '../utils/checkAuth';
// import { Dashboard } from '../containers/Dashboard';

export default function Index(): ReactElement {
  return <h1>Hi world</h1>;
}

export async function getServerSideProps(context) {
  // checkAuth(context);

  return {
    props: {},
  };
}

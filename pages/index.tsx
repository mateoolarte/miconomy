import { ReactElement } from 'react';
import { checkAuth } from '../utils/checkAuth';
import Dashboard from '../components/Dashboard';

export default function Index(): ReactElement {
  return <Dashboard></Dashboard>;
}

export async function getServerSideProps(context) {
  checkAuth(context);

  return {
    props: {},
  };
}

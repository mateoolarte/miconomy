import { ReactElement } from 'react';

import { checkAuth } from '../utils/checkAuth';

import MonthlyView from '../components/MonthlyView';

export default function MonthlyPage(): ReactElement {
  return <MonthlyView />;
}

export async function getServerSideProps(context) {
  checkAuth(context);

  return {
    props: {},
  };
}

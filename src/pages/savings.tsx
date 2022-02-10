import { checkAuth } from '../utils/checkAuth';

import { Savings } from '../containers/Savings';

export default function SavingsPage() {
  return <Savings />;
}

export async function getServerSideProps(context: object) {
  checkAuth(context);

  return {
    props: {},
  };
}

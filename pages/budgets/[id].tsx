import { checkAuth } from '../../utils/checkAuth';

import { Budget } from '../../containers/Budget';

export default function BudgetPage() {
  return <Budget />;
}

export async function getServerSideProps(context: object) {
  checkAuth(context);

  return {
    props: {},
  };
}

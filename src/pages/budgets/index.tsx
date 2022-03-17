import { checkAuth } from '../../utils/checkAuth';

import { Budgets } from '../../containers/Budgets';

export default function BudgetsPage() {
  return <Budgets />;
}

export async function getServerSideProps(context: object) {
  checkAuth(context);

  return {
    props: {},
  };
}

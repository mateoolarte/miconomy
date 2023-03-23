import { checkAuth } from '../utils/checkAuth';

import { Categories } from '../containers/Categories';

export default function CategoriesPage() {
  return <Categories />;
}

export async function getServerSideProps(context: object) {
  checkAuth(context);

  return {
    props: {},
  };
}

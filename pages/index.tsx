import { checkAuth } from '../utils/checkAuth';

import { Home } from '../containers/Home';

export default function Index() {
  return <Home />;
}

export async function getServerSideProps(context) {
  checkAuth(context);

  return {
    props: {},
  };
}

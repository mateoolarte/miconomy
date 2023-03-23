import { checkAuth } from '../../utils/checkAuth';

import { Entry } from '../../containers/Entry';

export default function EntryPage() {
  return <Entry />;
}

export async function getServerSideProps(context: object) {
  checkAuth(context);

  return {
    props: {},
  };
}

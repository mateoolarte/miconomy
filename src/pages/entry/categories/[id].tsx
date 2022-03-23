import { checkAuth } from '../../../utils/checkAuth';

import { EntryCategory } from '../../../containers/EntryCategory';

export default function EntryCategoryPage() {
  return <EntryCategory />;
}

export async function getServerSideProps(context: object) {
  checkAuth(context);

  return {
    props: {},
  };
}

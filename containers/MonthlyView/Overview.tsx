import { ReactElement } from 'react';

import OverviewDesktop from './OverviewDesktop';
import OverviewMobile from './OverviewMobile';

import { TABLET_SCREEN_SIZE } from '../../utils/constants';
import { cleanGraphqlObj } from '../../utils/cleanGraphqlObj';

import useWindowSize from '../../hooks/useWindowSize';
import useOverviewMonth from './hooks/useOverviewMonth';

export function Overview(): ReactElement {
  const viewport = useWindowSize();
  const { width } = viewport;
  const { loading, error, data } = useOverviewMonth();
  const status = data?.status;
  const overviewData = cleanGraphqlObj(data);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (status === 200) {
    return (
      <>
        <p className="mb-2">Resumen del mes</p>

        {width < TABLET_SCREEN_SIZE && <OverviewMobile {...overviewData} />}

        {width >= TABLET_SCREEN_SIZE && <OverviewDesktop {...overviewData} />}
      </>
    );
  }

  return null;
}

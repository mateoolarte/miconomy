import { ReactElement } from 'react';

import { TABLET_SCREEN_SIZE } from '../../utils/constants';

import useWindowSize from '../../hooks/useWindowSize';

import Layout from '../shared/Layout';
import OverviewDesktop from './OverviewDesktop';
import OverviewMobile from './OverviewMobile';

export default function MonthlyView(): ReactElement {
  const viewport = useWindowSize();
  const { width } = viewport;

  return (
    <Layout>
      <h2 className="font-bold text-xl mb:text-2xl mb-4 text-center md:text-left">
        Marzo 2021
      </h2>

      <p className="mb-2">Resumen del mes</p>

      {width < TABLET_SCREEN_SIZE ? <OverviewMobile /> : <OverviewDesktop />}
    </Layout>
  );
}

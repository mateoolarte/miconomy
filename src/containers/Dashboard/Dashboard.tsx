import { ReactElement } from 'react';
import { Feature } from '../../components/Feature';
import { Layout } from '../../components/shared/Layout';
import MonthChart from './MonthChart';
import { ListRow } from '../../components/ui/ListRow';
import {
  CategoriesWrapper,
  DashboardWrapper,
  SummaryWrapper,
  SummaryTitle,
} from './styled';
import { FEATURES, MONTH_CHART_DATA } from './data';

const mainSummaryRows = [
  { title: 'Ingresos', value: 300000 },
  { title: 'Gastos', value: 300000 },
  { title: 'Ahorro', value: 300000 },
  { title: 'Disponible', value: 300000 },
];

export function Dashboard(): ReactElement {
  return (
    <Layout
      wrapperClassName="h-screen flex flex-col"
      className="flex-grow overflow-hidden"
    >
      <DashboardWrapper className="grid divide-gray-300 divide-opacity-50 divide-y md:divide-y-0 md:divide-x h-full overflow-hidden">
        <SummaryWrapper className="p-2 w-full md:w-96 overflow-auto">
          <SummaryTitle className="font-bold text-xl mb:text-2xl mb-4 text-center">
            Resumen Marzo 2021
          </SummaryTitle>
          <div className="h-80 w-full">
            <MonthChart data={MONTH_CHART_DATA}></MonthChart>
          </div>
          <div className="w-full m-auto px-2 shadow divide-y divide-gray-300 divide-opacity-50">
            {mainSummaryRows.map((row, i) => (
              <ListRow key={i} title={row.title} value={row.value}></ListRow>
            ))}
          </div>
        </SummaryWrapper>
        <CategoriesWrapper className="flex-grow p-2 grid justify-center overflow-auto">
          {FEATURES.map((i) => (
            <Feature key={i.id} link={i.href}>
              <i.icon className="w-16 self-end"></i.icon>
              <span className="text-center">{i.label}</span>
            </Feature>
          ))}
        </CategoriesWrapper>
      </DashboardWrapper>
    </Layout>
  );
}

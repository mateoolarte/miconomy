import styled from 'styled-components';

export const CategoriesWrapper = styled.section`
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 0.5rem;
`;

export const DashboardWrapper = styled.div`
  grid-template-columns: 24rem 1fr;
  grid-template-rows: 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 24rem 1fr;
  }
`;

export const SummaryWrapper = styled.section`
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 2rem 1fr;
  }
`;

export const SummaryTitle = styled.h2`
  @media (max-width: 768px) {
    grid-column: 1/3;
  }
`;

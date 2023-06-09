import styled from 'styled-components';

export const Heading = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;

  p {
    color: #000;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

export const EmptyStateCtaContainer = styled.div`
  text-align: right;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  list-style-type: none;
`;

export const Item = styled.li`
  width: 100%;
`;

export const ItemLink = styled.a`
  display: block;
  padding: 0.8rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 4px;
`;

export const ItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
`;

export const ItemContent = styled.div`
  display: flex;
  column-gap: 2rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const ItemText = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  text-align: center;

  strong {
    display: block;
    color: #1e293b;
    font-size: 1.1rem;
  }
`;

export const ItemSavingText = styled.p`
  margin-bottom: 0.5rem;
  color: #94a3b8;
  font-size: 0.9rem;
  text-align: center;
`;

export const ItemSaving = styled.p`
  margin-bottom: 0.25rem;
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
`;

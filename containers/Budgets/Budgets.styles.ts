import styled from 'styled-components';

export const AddBudget = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 1.5rem;
  border: 1px dashed #94a3b8;
  border-radius: 0.25rem;
  background: none;
  color: #94a3b8;
  font-weight: 700;
  text-align: center;

  span {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const BudgetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const BudgetCard = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0px 2px 5px #cbd5e1;
`;

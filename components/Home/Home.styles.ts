import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const BalanceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.fullWidth ? '100%' : 'calc(50% - 0.5rem)')};
  padding: 1rem 0.5rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 4px;

  p {
    margin: 0;
    color: #94a3b8;
    font-size: 0.8rem;
  }

  strong {
    display: block;
    font-size: 1.2rem;
  }
`;

export const ActionsS = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

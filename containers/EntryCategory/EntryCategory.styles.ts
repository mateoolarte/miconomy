import styled from 'styled-components';

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const DeleteCategory = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: #f87171;
  font-size: 0.8rem;

  svg {
    margin-right: 0.5rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const ActionsBox = styled.div`
  width: 50%;
  padding: 0.5rem 0.75rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 6px;
`;

export const ActionsTitle = styled.p`
  margin-bottom: 0;
  color: #94a3b8;
  font-size: 0.8rem;
`;

export const ActionsValue = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const ActionsBtn = styled.button`
  border: 0;
  background: none;
`;

export const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 0;
  list-style-type: none;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 6px;
`;

export const ItemTitle = styled.p`
  margin: 0;
  width: 80%;
  font-size: 1rem;
  font-weight: 700;
`;

export const ItemDate = styled.span`
  display: inline-block;
  margin-left: 0.25rem;
  color: #94a3b8;
  font-size: 0.6rem;
  font-weight: 400;
`;

export const ItemValue = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

export const ItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
  width: 20%;
  text-align: right;
`;

export const ItemBtn = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-size: 1.2rem;
`;

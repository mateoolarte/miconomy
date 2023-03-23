import styled from 'styled-components';

export const UpdateBtnContainer = styled.div`
  text-align: right;
`;

export const UpdateName = styled.form`
  margin-bottom: 1.5rem;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-bottom: 1.5rem;
  padding-left: 0;
  list-style-type: none;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 6px;
`;

export const Info = styled.div``;

export const Title = styled.h3`
  margin-bottom: 0;
  font-size: 1.1rem;
  font-weight: 700;
`;

export const Description = styled.p`
  margin-bottom: 0;
  color: #94a3b8;

  strong {
    color: #1e293b;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
`;

export const BtnIcon = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-size: 1.2rem;
`;

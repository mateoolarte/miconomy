import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 6px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const BtnIcon = styled.button`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  border: 0;
  background: none;
  font-size: 1.4rem;
`;

export const AddCategory = styled.button`
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

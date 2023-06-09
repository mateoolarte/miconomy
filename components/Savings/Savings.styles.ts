import styled from 'styled-components';

export const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  padding: 0.5rem 0.75rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 6px;
`;

export const NotificationText = styled.p`
  width: 70%;
  margin-bottom: 0;
  font-size: 0.7rem;
`;

export const Box = styled.div`
  padding: 0.75rem 1rem;
  box-shadow: 0px 2px 5px #cbd5e1;
  border-radius: 6px;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
`;

export const PrimaryActions = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
  width: 20%;
  margin-left: 1rem;
`;

export const BtnIcon = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-size: 1.1rem;
`;

export const Description = styled.p`
  margin-bottom: 0;
  color: #94a3b8;
  font-size: 0.8rem;

  strong {
    display: block;
    color: #1f2937;
    font-size: 1.1rem;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

export const SecondaryActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
`;

export const AddSaving = styled.button`
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

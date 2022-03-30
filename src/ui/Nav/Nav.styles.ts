import styled from 'styled-components';

export const Wrapper = styled.nav`
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  box-shadow: 0px -3px 6px rgba(226, 232, 240, 0.8);
  background-color: #fff;
`;

export const List = styled.ul`
  display: flex;
  column-gap: 1.5rem;
  justify-content: space-between;
  margin: 0;
  padding: 0.5rem 1rem;
  list-style-type: none;
`;

export const Item = styled.li`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const ItemPrimary = styled.li``;

export const ItemPrimaryBtn = styled.button`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  border: 0;
  background: none;

  .anticon {
    position: absolute;
    top: -1.5rem;
    padding: 0.6rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.isClosed ? '#000' : 'var(--ant-primary-color)'};
    color: #fff;

    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

export const LinkTextPrimary = styled.span`
  margin-top: 1.6rem;
  color: ${(props) => (props.isClosed ? '#000' : 'var(--ant-primary-color)')};
  font-size: 0.7rem;
  font-weight: 700;
`;

export const LinkText = styled.span`
  margin-top: 0.2rem;
  font-size: 0.7rem;
`;

export const ItemSecondary = styled.li``;

export const ItemSecondaryBtn = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 0;
  background: none;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

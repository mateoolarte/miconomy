import styled from 'styled-components';

export const Wrapper = styled.a`
  display: inline-block;
  width: ${({ fullwidth }) => (fullwidth ? '100%' : 'auto')};
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  background-color: var(--ant-primary-color);
  color: var(--ant-primary-1);
  text-align: center;

  &:active {
    color: var(--ant-primary-1);
  }
`;

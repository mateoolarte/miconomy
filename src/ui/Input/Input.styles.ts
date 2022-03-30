import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.error ? 'var(--ant-error-color)' : '#94a3b8')};
`;

export const Error = styled.p`
  margin-top: 0.5rem;
  color: var(--ant-error-color);
  font-size: 0.8rem;
`;

export const ShowPassword = styled.button`
  position: absolute;
  top: 2.2rem;
  right: 1rem;
  border: 0;
  background: none;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    stroke: #94a3b8;
  }
`;

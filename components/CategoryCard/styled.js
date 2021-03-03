import styled from 'styled-components';

export const Wrapper = styled.div`
  width: calc(100% / 4 - 1rem);
  margin: 0 0.5rem 1rem;

  &:first-child {
    width: calc(100% / 4 - 0.5rem);
    margin-left: 0;
  }

  &:nth-child(5n) {
    width: calc(100% / 4 - 0.5rem);
    margin-left: 0;
  }

  &:nth-child(4n) {
    width: calc(100% / 4 - 0.5rem);
    margin-right: 0;
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  column-gap: 0.5rem;
  list-style-type: none;
`;

export const Item = styled.li`
  color: #94a3b8;
  font-size: 0.9rem;

  svg {
    fill: #94a3b8;
    margin-right: 0.5rem;
  }

  span {
    margin-left: 0.5rem;
  }
`;

export const PathLink = styled.a`
  color: #94a3b8;

  &:active {
    color: #64748b;
  }
`;

export const Path = styled.p`
  margin: 0;
  color: #1e293b;
`;

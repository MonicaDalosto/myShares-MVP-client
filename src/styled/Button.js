import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.primary ? 'var(--color-primary)' : 'white')};
  color: ${props => (props.primary ? 'white' : 'var(--color-primary)')};
  font-size: 1em;
  margin: 1em auto;
  padding: 0.25em 1em;
  border: 2px solid var(--color-primary);
  border-radius: 5px;
  width: 50%;

  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
`;

import styled from 'styled-components';

export const Button = styled.button`
  width: ${props => (props.dashboard ? '150px' : '100%')};
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid var(--color-primary);
  background-color: var(--color-primary);
  color: var(--color-white);

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    border: 2px solid var(--color-primary);
    background-color: var(--color-white);
    color: var(--color-primary);
  }
`;

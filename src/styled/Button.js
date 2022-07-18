import styled from 'styled-components';

export const Button = styled.button`
  width: ${props => (props.dashboard ? '150px' : '100%')};
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-paragraph);
  background-color: var(--color-paragraph);
  color: var(--color-white);

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    border: 1px solid var(--color-paragraph);
    background-color: var(--color-white);
    color: var(--color-paragraph);
  }
`;

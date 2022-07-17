import styled from 'styled-components';

export const Formulary = styled.form`
  color: var(--color-title);
  width: ${props => (props.login ? '400px' : '500px')};
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  label {
    margin: 10px 0;
  }

  select,
  input {
    border: 2px solid var(--color-primary);
    padding: 8px;
    float: right;
    border-radius: 5px;
    width: ${props => (props.login ? '100%' : '300px')};
  }

  input :focus {
    outline: var(--color-nav-hover);
    border: 2px solid transparent;
  }

  span {
    color: red;
    font-size: 0.8rem;
  }

  button {
    width: 100%;
    font-size: 1rem;
    padding: 10px;
    border-radius: 4px;
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
  }
`;

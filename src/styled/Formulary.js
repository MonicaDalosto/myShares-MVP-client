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
    margin: ${props => (props.login ? '10px 0px' : '0')};
    font-size: 1rem;
    border: 1px solid var(--color-paragraph);
    padding: ${props => (props.login ? '12px' : '8px')};
    float: right;
    border-radius: 5px;
    width: ${props => (props.login ? '100%' : '300px')};

    ::placeholder {
      color: var(--color-paragraph);
    }

    :focus {
      outline: ${props =>
        props.checkbox ? 'none' : '2px solid var(--color-nav-hover)'};
      border: 2px solid transparent;
    }
  }

  span {
    color: red;
    font-size: 0.8rem;
  }
`;

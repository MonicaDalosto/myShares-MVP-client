import styled from 'styled-components';

export const Input = styled.input`
  width: 50%;
  padding: 12px 20px;
  margin: 8px auto;
  border: 1px solid #ccc;
  border-radius: 4px;

  ::placeholder {
    color: var(--color-primary);
  }
`;

// Só está sendo usado no Signup;

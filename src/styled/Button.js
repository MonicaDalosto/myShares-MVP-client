import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.primary ? '#000050' : 'white')};
  color: ${props => (props.primary ? 'white' : '#000050')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000050;
  border-radius: 5px;
  width: 50%;

  &:hover {
    background-color: #000050;
    color: white;
    // border: 3px solid #000050;
  }
`;

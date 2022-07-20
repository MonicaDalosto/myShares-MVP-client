import styled from 'styled-components';

export const Container = styled.div`
  min-height: 70vh;
  box-sizing: content-box;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  max-width: ${props => (props.dashboard ? '900px' : '1050px')};
  margin: 0 auto;

  padding: 80px 10px 140px;
  display: flex;
  flex-direction: column;
`;

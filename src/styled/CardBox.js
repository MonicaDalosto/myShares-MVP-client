import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 20px 0;
`;
export const CardBox = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  height: 160px;
  width: 220px;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: none;
  border-radius: 5px;
  -webkit-box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  box-shadow: 0 0.75rem 1.5remrgba (18, 38, 63, 0.03);
`;

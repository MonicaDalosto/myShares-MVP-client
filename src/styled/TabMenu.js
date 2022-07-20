import styled from 'styled-components';

export const TabContainer = styled.div`
  background: var(--color-white);
  width: 100%;
  max-width: ${props => (props.forms ? '900px' : '1050px')};
  margin: 20px auto 0;
  padding: 20px auto;
  border-radius: 5px;
  -webkit-box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  box-shadow: 0 0.75rem 1.5remrgba (18, 38, 63, 0.03);
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .tab {
    color: var(--color-title);
    font-size: 1.1rem;
    font-weight: bold;
    width: 45%;
    margin: 30px 0 0;
    background-color: var(--color-white);
    color: var(--color-title);
    padding: 10px;
    border-radius: 5px;
    border: none;
  }

  .tab:hover {
    cursor: pointer;
    color: var(--color-nav-hover);
  }

  .tab.active {
    background-color: var(--color-nav-hover);
    color: var(--color-white);
    -webkit-box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    box-shadow: 0 0.75rem 1.5remrgba (18, 38, 63, 0.03);
  }
`;

export const Panels = styled.div`
  background: var(--color-white);

  .panel {
    display: none;
  }

  & .active {
    display: block;
  }
`;

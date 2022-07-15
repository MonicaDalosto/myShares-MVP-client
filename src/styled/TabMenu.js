import styled from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--color-primary);

  .tab {
    justify-content: left;
    align-items: left;
    width: 50%;
    background: var(--color-primary);
    color: var(--color-secondary);
    padding: 1em 0;
    border: none;
  }

  .tab.active {
    font-weight: bold;
    // text-decoration: underline;
    font-size: 1.1em;
  }

  .tab:hover {
    cursor: pointer;
  }
`;

export const Panels = styled.div`
  .panel {
    display: none;
    padding: 0 0 0 30px;
    height: 250px;
    text-align: left;
  }

  & .active {
    display: block;
  }
`;

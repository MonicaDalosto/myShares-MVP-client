import styled from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  width: 100%;

  .tab {
    justify-content: left;
    align-items: left;
    width: 50%;
    background: var(--color-white);
    color: var(--color-title);
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
    color: var(--color-nav-hover);
  }
`;

export const Panels = styled.div`
  .panel {
    display: none;
    background: var(--color-white);
  }

  & .active {
    display: block;
  }
`;

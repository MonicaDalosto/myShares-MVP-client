import styled from 'styled-components';

export const TableContainer = styled.div`
  margin: auto;
  // padding: 5%;
  // border-radius: 5px;
  // box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  width: 100%;
  max-width: 100%;
  color: var(--color-primary);
  // white-space: nowrap;
  // font-weight: normal;
  // border: none;
  td,
  th {
    text-align: center;
    padding: 12px 15px;
  }

  td {
    border-right: 1px solid var(--color-bg-table);
  }

  thead tr {
    background-color: var(--color-primary);
    color: var(--color-secondary);
    text-align: left;
    font-size: 1rem;
  }

  tbody tr:nth-child(even) {
    background: var(--color-bg-table);
  }

  tfoot tr {
    font-weight: bold;
    background: var(--color-bg-table);
  }

  input {
    border: 0;
    padding: 5px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    width: 200px;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;

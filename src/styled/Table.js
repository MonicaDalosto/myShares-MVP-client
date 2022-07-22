import styled from 'styled-components';

export const TableContainer = styled.div`
  margin: 20px auto 0;
  background-color: var(--color-white);
  padding: 40px 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  box-shadow: 0 0.75rem 1.5remrgba (18, 38, 63, 0.03);

  h2 {
    color: var(--color-title);
    font-size: 1.1rem;
    width: 730px;
    margin: 0 auto 30px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  width: 100%;
  max-width: 100%;
  color: var(--color-title);

  tr:nth-child(even) {
    background: var(--color-bg-table);
  }

  tfoot tr,
  thead tr {
    background: var(--color-bg-table);
  }

  td,
  th {
    text-align: center;
    padding: 12px 15px;
  }

  thead tr {
    font-size: 1rem;
  }

  tfoot tr {
    font-weight: bold;
  }

  input {
    border: 1px solid var(--color-paragraph);
    padding: 5px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    width: 200px;

    :focus {
      outline: 2px solid var(--color-nav-hover);
      border: 2px solid transparent;
    }
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

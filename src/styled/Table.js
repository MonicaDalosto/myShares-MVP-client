import styled from 'styled-components';

export const TableContainer = styled.div`
  margin: 100px auto;
  // padding: 5%;
  // border-radius: 5px;
  // box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  width: 100%;
  max-width: 100%;
  color: #000050;
  // border-radius: 5px;
  // white-space: nowrap;
  // font-weight: normal;
  // border: none;
  // background-color: white;
  td,
  th {
    text-align: center;
    padding: 12px 15px;
  }

  td {
    border-right: 1px solid #f8f8f8;
  }

  thead tr {
    background-color: #000050;
    color: #ececec;
    text-align: left;
    font-size: 1rem;
  }

  tbody tr:nth-child(even) {
    background: #f8f8f8;
  }

  tfoot tr {
    font-weight: bold;
    background: #f8f8f8;
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
`;

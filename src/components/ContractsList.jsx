import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy
} from 'react-table';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { deleteContract } from '../store/contracts/thunks';
import { Modal } from './Modal';
import { TableContainer, Table } from '../styled';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
      {/* {`${count} records...`} */}
    </span>
  );
}

const ContractsList = ({ allEmployeeContracts }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [contractId, setContractId] = useState('');

  const submitDeleteContract = event => {
    event.preventDefault();
    dispatch(deleteContract(contractId));
    setContractId('');
    setIsOpen(false);
  };

  const data = React.useMemo(
    () => [...allEmployeeContracts],
    [allEmployeeContracts]
  ); // get the data from the parent component (props);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Employee',
        accessor: 'name' // accessor is the "key" in the data
      },
      {
        Header: 'Department',
        accessor: 'department'
      },
      {
        Header: 'Signature Date',
        accessor: 'signatureDate',
        Cell: ({ row }) => (
          <span>{moment(row.original.signatureDate).format('DD/MM/YYYY')}</span>
        )
      },
      {
        Header: 'Cliff Date',
        accessor: 'cliffDate',
        Cell: ({ row }) => (
          <span>{moment(row.original.cliffDate).format('DD/MM/YYYY')}</span>
        )
      },
      {
        Header: 'Granted Shares',
        accessor: 'grantedShares',
        Cell: ({ row }) => (
          <NumberFormat
            value={row.original.grantedShares}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        )
      },
      {
        Header: 'Months After Signature',
        accessor: 'numberOfMonthsAfterSignatureDate'
      },
      {
        Header: 'Owned Shares',
        accessor: 'virtualOwnedShares',
        Cell: ({ row }) => (
          <NumberFormat
            value={row.original.virtualOwnedShares}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        )
      },
      {
        Header: 'Current valuation',
        accessor: 'sharesValueBasedCompanyCurrentValuation',
        Cell: ({ row }) => (
          <NumberFormat
            value={row.original.virtualOwnedShares}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        )
      },
      {
        Header: 'Delete Contract',
        Cell: ({ row }) => {
          // console.log(row.original);
          return (
            <button
              type="button"
              value={row.original.contractId}
              onClick={event => {
                setContractId(Number(event.target.value));
                setIsOpen(true);
              }}
            >
              🗑
            </button>
          );
        }
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = tableInstance;

  return (
    <TableContainer>
      <h2>Contracts</h2>
      <Table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left'
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          submitDeleteForm={submitDeleteContract}
          name=" this Contract"
        />
      )}
    </TableContainer>
  );
};

export { ContractsList };

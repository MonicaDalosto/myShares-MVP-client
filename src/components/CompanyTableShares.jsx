import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy
} from 'react-table';
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
      </span>
    </span>
  );
}

const CompanyTableShares = ({ contracts }) => {
  const data = React.useMemo(() => [...contracts], [contracts]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Employee',
        accessor: 'totalOfEmployeeShares.name', // accessor is the "key" in the data
        Footer: 'Total'
      },
      {
        Header: 'Department',
        accessor: 'totalOfEmployeeShares.department'
      },
      {
        Header: 'Number of Contracts',
        accessor: 'totalOfEmployeeShares.numberOfContracts',
        Footer: number =>
          number.rows.reduce(
            (sum, row) =>
              row.values['totalOfEmployeeShares.numberOfContracts'] + sum,
            0
          )
      },
      {
        Header: 'Granted Shares',
        accessor: 'totalOfEmployeeShares.totalOfVirtualGrantedShares',
        Cell: ({ row }) => (
          <NumberFormat
            value={
              row.original.totalOfEmployeeShares.totalOfVirtualGrantedShares
            }
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        ),
        Footer: grantedShares => {
          const value = grantedShares.rows.reduce(
            (sum, row) =>
              row.values['totalOfEmployeeShares.totalOfVirtualGrantedShares'] +
              sum,
            0
          );
          return (
            <NumberFormat
              value={value}
              displayType={'text'}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          );
        }
      },
      {
        Header: 'Owned Shares',
        accessor: 'totalOfEmployeeShares.totalOfVirtualOwnedShares',
        Cell: ({ row }) => (
          <NumberFormat
            value={row.original.totalOfEmployeeShares.totalOfVirtualOwnedShares}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        ),
        Footer: ownedShares => {
          const value = ownedShares.rows.reduce(
            (sum, row) =>
              row.values['totalOfEmployeeShares.totalOfVirtualOwnedShares'] +
              sum,
            0
          );
          return (
            <NumberFormat
              value={value}
              displayType={'text'}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          );
        }
      },
      {
        Header: 'Current valuation',
        accessor:
          'totalOfEmployeeShares.totalOfSharesValueBasedCompanyCurrentValuation',
        Cell: ({ row }) => (
          <NumberFormat
            value={
              row.original.totalOfEmployeeShares
                .totalOfSharesValueBasedCompanyCurrentValuation
            }
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        ),
        Footer: currentValuation => {
          const value = currentValuation.rows.reduce(
            (sum, row) =>
              row.values[
                'totalOfEmployeeShares.totalOfSharesValueBasedCompanyCurrentValuation'
              ] + sum,
            0
          );
          return (
            <NumberFormat
              value={value}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          );
        }
      },
      {
        Header: 'Details Page',
        Cell: ({ row }) => {
          return (
            <span>
              <Link
                to={{
                  pathname: `/employee-details/${row.original.totalOfEmployeeShares.userId}`,
                  state: { data: row }
                }}
              >
                🔍
              </Link>
            </span>
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
    footerGroups,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = tableInstance;

  return (
    <TableContainer>
      <h2>Employee's Contracts summary</h2>
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
        <tfoot>
          {footerGroups.map(group => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </TableContainer>
  );
};

export { CompanyTableShares };

import React from 'react';
import { useTable } from 'react-table';
import { TableContainer, Table } from '../styled';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const EmployeeTableShares = ({ contracts }) => {
  const data = React.useMemo(() => [...contracts], [contracts]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Signature Date',
        accessor: 'signatureDate', // accessor is the "key" in the data
        Cell: ({ row }) => (
          <span>{moment(row.original.signatureDate).format('DD/MM/YYYY')}</span>
        ),
        Footer: 'Total'
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
        ),
        Footer: grantedShares => {
          const value = grantedShares.rows.reduce(
            (sum, row) => row.values.grantedShares + sum,
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
        Header: 'End Cliff Period',
        accessor: 'cliffDate',
        Cell: ({ row }) => (
          <span>{moment(row.original.cliffDate).format('DD/MM/YYYY')}</span>
        )
      },
      {
        Header: 'Months after Signature Date',
        accessor: 'numberOfMonthsAfterSignatureDate'
      },
      {
        Header: 'Virtual Owned Shares',
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
        ),
        Footer: ownedShares => {
          const value = ownedShares.rows.reduce(
            (sum, row) => row.values.virtualOwnedShares + sum,
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
        Header: 'Shares Value based on Current valuation',
        accessor: 'sharesValueBasedCompanyCurrentValuation',
        Cell: ({ row }) => (
          <NumberFormat
            value={row.original.sharesValueBasedCompanyCurrentValuation}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        ),
        Footer: sharesValues => {
          const value = sharesValues.rows.reduce(
            (sum, row) =>
              row.values.sharesValueBasedCompanyCurrentValuation + sum,
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
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups
  } = tableInstance;

  return (
    <TableContainer>
      <h2>Contracts List</h2>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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

export { EmployeeTableShares };

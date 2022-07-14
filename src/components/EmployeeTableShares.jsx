import React from 'react';
import { useTable } from 'react-table';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const EmployeeTableShares = ({ contracts }) => {
  const data = React.useMemo(() => [...contracts], [contracts]); // get the data from the parent component (props);

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
    <div>
      {/* apply the table props */}
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
        <tfoot>
          {
            // Loop over the header rows
            footerGroups.map(group => (
              // Apply the header row props
              <tr {...group.getFooterGroupProps()}>
                {
                  // Loop over the headers in each row
                  group.headers.map(column => (
                    // Apply the header cell props
                    <td {...column.getFooterProps()}>
                      {
                        // Render the header
                        column.render('Footer')
                      }
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
    </div>
  );
};

export { EmployeeTableShares };

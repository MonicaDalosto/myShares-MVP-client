import React from 'react';
import { useTable } from 'react-table';

const EmployeeTableShares = ({ contracts }) => {
  const data = React.useMemo(() => [...contracts], [contracts]); // get the data from the parent component (props);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Signature Date',
        accessor: 'signatureDate', // accessor is the "key" in the data
        Footer: 'Total'
      },
      {
        Header: 'Granted Shares',
        accessor: 'grantedShares',
        Footer: grantedShares =>
          grantedShares.rows.reduce(
            (sum, row) => row.values.grantedShares + sum,
            0
          )
      },
      {
        Header: 'End Cliff Period',
        accessor: 'cliffDate'
      },
      {
        Header: 'Months after Signature Date',
        accessor: 'numberOfMonthsAfterSignatureDate'
      },
      {
        Header: 'Virtual Shares Owned',
        accessor: 'virtualOwnedShares',
        Footer: ownedShares =>
          ownedShares.rows.reduce(
            (sum, row) => row.values.virtualOwnedShares + sum,
            0
          )
      },
      {
        Header: 'Shares Value based on Current valuation',
        accessor: 'sharesValueBasedCompanyCurrentValuation',
        Footer: sharesValues =>
          sharesValues.rows.reduce(
            (sum, row) =>
              row.values.sharesValueBasedCompanyCurrentValuation + sum,
            0
          )
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
      <h2>Summary table</h2>
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

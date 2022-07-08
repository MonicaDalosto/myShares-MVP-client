import React from 'react';
import { useTable, useSortBy } from 'react-table';

const CompanyTableShares = ({ contracts }) => {
  const data = React.useMemo(() => [...contracts], []); // get the data from the parent component (props);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Employee',
        accessor: 'name', // accessor is the "key" in the data
        Footer: 'Total'
      },
      {
        Header: 'Department',
        accessor: 'employee.department'
      },
      {
        Header: 'Number of Contracts',
        accessor: 'totalOfEmployeeShares.numberOfContracts',
        Footer: number =>
          number.rows.reduce(
            (sum, row) => row.values.numberOfContracts + sum,
            0
          )
      },
      {
        Header: 'Granted Shares',
        accessor: 'totalOfEmployeeShares.totalOfVirtualGrantedShares'
        // Footer: grantedShares =>
        //   grantedShares.rows.reduce((sum, row) => {
        //     console.log(row.values)
        //     return row.values.totalOfEmployeeShares.totalOfVirtualGrantedShares + sum;
        //   }, 0)
      },
      {
        Header: 'Owned Shares',
        accessor: 'totalOfEmployeeShares.totalOfVirtualOwnedShares'
      },
      {
        Header: 'Current valuation',
        accessor:
          'totalOfEmployeeShares.totalOfSharesValueBasedCompanyCurrentValuation'
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

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
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
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

export { CompanyTableShares };

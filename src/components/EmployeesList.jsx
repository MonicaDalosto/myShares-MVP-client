import React from 'react';
import { Link } from 'react-router-dom';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy
} from 'react-table';
import { TableContainer, Table } from '../styled';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import moment from 'moment';

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

const EmployeesList = ({ allEmployees }) => {
  const data = React.useMemo(() => [...allEmployees], [allEmployees]); // get the data from the parent component (props);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Employee',
        accessor: 'name' // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Is Admin',
        // accessor: 'isAdmin',
        Cell: ({ row }) => <span>{row.original.isAdmin ? '✔️' : '✖️'}</span>
      },
      {
        Header: 'Department',
        accessor: 'employee.department'
      },
      {
        Header: 'Start Date',
        accessor: 'employee.startDate',
        Cell: ({ row }) => (
          <span>
            {moment(row.original.employee.startDate).format('DD/MM/YYYY')}
          </span>
        )
      },
      {
        Header: 'Is Active',
        // accessor: 'employee.isActive',
        Cell: ({ row }) => (
          // <span>{row.original.employee.isActive ? '✔️' : '❌'}</span>
          <span>{row.original.employee.isActive ? '✔️' : '✖️'}</span>
        )
      },
      {
        Header: 'End Date',
        accessor: 'employee.endDate',
        Cell: ({ row }) => (
          <span>
            {row.original.employee.endDate &&
              moment(row.original.employee.endDate).format('DD/MM/YYYY')}
          </span>
        )
      },
      {
        Header: 'Settings',
        Cell: ({ row }) => {
          // console.log(row.original);
          return (
            <span>
              <Link
                style={{ margin: '0 10px' }}
                to={{
                  pathname: `/edit-employee/${row.original.id}/0`,
                  state: { data: row }
                }}
              >
                🔧
              </Link>
              {''}
              <Link
                style={{ margin: '0 10px' }}
                to={{
                  pathname: `/edit-employee/${row.original.id}/1`,
                  state: { data: row }
                }}
              >
                🗑
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
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = tableInstance;

  return (
    <TableContainer>
      <h2>Employees</h2>
      {/* apply the table props */}
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
      </Table>
    </TableContainer>
  );
};

export { EmployeesList };

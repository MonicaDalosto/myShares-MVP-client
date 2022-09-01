import React from 'react';
import { Link } from 'react-router-dom';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy
} from 'react-table';
import { TableContainer, Table } from '../styled';
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
        Header: 'Admin',
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
        Header: 'Active',
        Cell: ({ row }) => (
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
          return (
            <span style={{ minWidth: '50px' }}>
              <Link
                to={{
                  pathname: `/edit-employee/${row.original.id}/0`,
                  state: { data: row }
                }}
              >
                🔧
              </Link>
              {''}
              <Link
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
    </TableContainer>
  );
};

export { EmployeesList };

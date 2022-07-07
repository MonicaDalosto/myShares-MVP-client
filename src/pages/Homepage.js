import { Title } from '../styled';
import { Link } from 'react-router-dom';
import { LinkWord } from '../styled';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeesContractsSummary } from '../store/contracts/thunks';
import { selectAllEmployeeContractsSummary } from '../store/contracts/selectors';

export const Homepage = () => {
  const dispatch = useDispatch();
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);

  useEffect(() => {
    dispatch(getAllEmployeesContractsSummary());
  }, [dispatch]);

  if (!allEmployeeContracts) {
    return (
      <div>
        <h2>Homepage loading...</h2>
      </div>
    );
  }

  return (
    <Container>
      <h2>Homepage</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Number of Contracts</th>
            <th>Granted Shares</th>
            <th>Owned Shares</th>
            <th>Current Valuation</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allEmployeeContracts.map(employee => (
            <tr key={employee.employee.id}>
              <td>{employee.name}</td>
              <td>{employee.employee.department}</td>
              <td>{employee.totalOfEmployeeShares.numberOfContracts}</td>
              <td>
                {employee.totalOfEmployeeShares.totalOfVirtualGrantedShares}
              </td>
              <td>
                {employee.totalOfEmployeeShares.totalOfVirtualOwnedShares}
              </td>
              <td>
                {
                  employee.totalOfEmployeeShares
                    .totalOfSharesValueBasedCompanyCurrentValuation
                }
              </td>
              <td>icon</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;

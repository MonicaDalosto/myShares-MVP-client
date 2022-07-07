import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeContractsSummary } from '../store/contracts/thunks';
import { selectUser } from '../store/user/selectors';
import { selectEmployeeContractsSummary } from '../store/contracts/selectors';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const contractsSummary = useSelector(selectEmployeeContractsSummary);

  // console.log('user from EmployeeDashboard: ', user);

  useEffect(() => {
    if (user) {
      dispatch(getEmployeeContractsSummary(user.id));
    }
  }, [dispatch, user]);

  if (!contractsSummary) {
    return (
      <div>
        <h2>You don't have any contract...</h2>
      </div>
    );
  }

  const { employeeContractsSummary, totalContractsSummary } = contractsSummary;

  return (
    <div>
      <h2> Employee Dashboard </h2>
      <table>
        <thead>
          <tr>
            <th>Signature Date</th>
            <th>Granted Shares</th>
            <th>End Cliff Period</th>
            <th>Number of Months after Signature Date</th>
            <th>Virtual Shares Owned</th>
            <th>Shares Value based on Current valuation</th>
          </tr>
        </thead>
        <tbody>
          {employeeContractsSummary.map(contract => (
            <tr key={contract.id}>
              <td>{contract.signatureDate}</td>
              <td>{contract.grantedShares}</td>
              <td>{contract.cliffDate}</td>
              <td>{contract.numberOfMonthsAfterSignatureDate}</td>
              <td>{contract.virtualOwnedShares}</td>
              <td>{contract.sharesValueBasedCompanyCurrentValuation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { EmployeeDashboard };

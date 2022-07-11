import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyContractsSummary } from '../store/contracts/thunks';
import { selectUser } from '../store/user/selectors';
import { selectMyContractsSummary } from '../store/contracts/selectors';
import { BarChartShares, EmployeeTableShares } from '../components';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const contractsSummary = useSelector(selectMyContractsSummary);

  useEffect(() => {
    // if (user) {
    dispatch(getMyContractsSummary());
    // }
  }, [dispatch]);

  if (!contractsSummary) {
    return (
      <div>
        <h2>You don't have any contract...</h2>
      </div>
    );
  }

  const { employeeContractsSummary, grantedXOwnedShares } = contractsSummary;

  return (
    <div>
      <h2> Employee Dashboard </h2>
      <div>
        <BarChartShares data={grantedXOwnedShares} />
      </div>
      <h2>Summary table</h2>
      <div>
        <EmployeeTableShares contracts={employeeContractsSummary} />
      </div>
    </div>
  );
};

export { EmployeeDashboard };

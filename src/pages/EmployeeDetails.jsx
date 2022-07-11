import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BarChartShares, EmployeeTableShares } from '../components';
import { getEmployeeContractsSummary } from '../store/contracts/thunks';
import { selectEmployeeContractsSummary } from '../store/contracts/selectors';

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const contractsSummary = useSelector(selectEmployeeContractsSummary);

  useEffect(() => {
    dispatch(getEmployeeContractsSummary(id));
  }, [dispatch, id]);

  if (!contractsSummary) {
    return (
      <div>
        <h2>The employee doesn't have any contract...</h2>
      </div>
    );
  }

  const { employeeContractsSummary, grantedXOwnedShares } = contractsSummary;

  return (
    <div>
      <h2>{contractsSummary.name}'s Details Page</h2>
      <div>
        <BarChartShares data={grantedXOwnedShares} />
      </div>
      <h2>{contractsSummary.name}'s summary table</h2>
      <div>
        <EmployeeTableShares contracts={employeeContractsSummary} />
      </div>
    </div>
  );
};

export { EmployeeDetails };

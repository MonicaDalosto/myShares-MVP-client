import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyContractsSummary,
  getSharesProjection
} from '../store/contracts/thunks';
import { selectUser } from '../store/user/selectors';
import {
  selectMyContractsSummary,
  selectMySharesProjection
} from '../store/contracts/selectors';
import { BarChartShares, EmployeeTableShares } from '../components';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const contractsSummary = useSelector(selectMyContractsSummary);
  const sharesProjection = useSelector(selectMySharesProjection);

  // console.log('shares projection: ', sharesProjection);

  const [projectedValuation, setProjectedValuation] = useState('');
  const [projectedDate, setProjectedDate] = useState('');

  useEffect(() => {
    // if (user) {
    dispatch(getMyContractsSummary());
    // }
  }, [dispatch]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(getSharesProjection(projectedValuation, projectedDate));
  };

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
      <h2>Virtual Shares Projection</h2>
      <p>
        Do you want to see the projection of your virtual shares? Fill the form
        below:
      </p>
      <form
        style={{ display: 'flex', flexDirection: 'column' }} // in the future, I should change this style for styled components.
        onSubmit={submitForm}
      >
        <label>
          Projected Company valuation
          <input
            value={projectedValuation}
            placeholder="1000000.00"
            onChange={event => setProjectedValuation(event.target.value)}
          />
        </label>
        <label>
          Projected Date
          <input
            type="date"
            value={projectedDate}
            onChange={event => setProjectedDate(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {sharesProjection && (
        <div>
          <button>Reset Projections</button>
          <h2>Projections Chart</h2>
          <div>
            <BarChartShares data={sharesProjection.grantedXOwnedShares} />
          </div>
          <h2>Projections table</h2>
          <div>
            <EmployeeTableShares
              contracts={sharesProjection.employeeContractsSummary}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { EmployeeDashboard };

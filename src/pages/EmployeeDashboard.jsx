import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarChartShares, EmployeeTableShares } from '../components';
import {
  getMyContractsSummary,
  getSharesProjection
} from '../store/contracts/thunks';
import { selectToken, selectUser } from '../store/user/selectors';
import {
  selectMyContractsSummary,
  selectMySharesProjection
} from '../store/contracts/selectors';
import { setMySharesProjection } from '../store/contracts/slice';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // const user = useSelector(selectUser);
  const contractsSummary = useSelector(selectMyContractsSummary);
  const sharesProjection = useSelector(selectMySharesProjection);

  const [projectedValuation, setProjectedValuation] = useState('');
  const [projectedDate, setProjectedDate] = useState('');

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    dispatch(getMyContractsSummary());
  }, [dispatch, navigate, token]);

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
          <button onClick={event => dispatch(setMySharesProjection(null))}>
            Reset Projections
          </button>
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

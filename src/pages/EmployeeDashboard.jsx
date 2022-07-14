import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from '../styled';
import { Banner, BarChartShares, EmployeeTableShares } from '../components';
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
      <Container>
        <Title>You don't have any contract!</Title>
      </Container>
    );
  }

  const { employeeContractsSummary, grantedXOwnedShares } = contractsSummary;

  return (
    <Container>
      <Title> Employee Dashboard </Title>
      <BarChartShares data={grantedXOwnedShares} />
      <h2>Summary table</h2>
      <EmployeeTableShares contracts={employeeContractsSummary} />
      <Title>Virtual Shares Projection</Title>
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
    </Container>
  );
};

export { EmployeeDashboard };

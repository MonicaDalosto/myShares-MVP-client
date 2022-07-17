import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from '../styled';
import {
  BarChartShares,
  Cards,
  EmployeeTableShares,
  ProjectionForm
} from '../components';
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

  const formValid = projectedValuation || projectedDate;

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

  const {
    employeeContractsSummary,
    totalContractsSummary,
    grantedXOwnedShares
  } = contractsSummary;

  return (
    <Container dashboard>
      <Cards totalContracts={totalContractsSummary} />
      <BarChartShares data={grantedXOwnedShares} />
      <EmployeeTableShares contracts={employeeContractsSummary} />

      <ProjectionForm
        submitForm={submitForm}
        projectedValuation={projectedValuation}
        setProjectedValuation={setProjectedValuation}
        projectedDate={projectedDate}
        setProjectedDate={setProjectedDate}
        formValid={formValid}
      />
      {sharesProjection && (
        <div>
          <Title>Virtual Shares Projection</Title>
          <button onClick={event => dispatch(setMySharesProjection(null))}>
            Reset Projections
          </button>
          <BarChartShares data={sharesProjection.grantedXOwnedShares} />
          <EmployeeTableShares
            contracts={sharesProjection.employeeContractsSummary}
          />
        </div>
      )}
    </Container>
  );
};

export { EmployeeDashboard };

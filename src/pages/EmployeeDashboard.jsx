import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { Container, Title } from '../styled';
import {
  BarChartShares,
  Cards,
  EmployeeTableShares,
  ProjectionForm
} from '../components';
import { selectToken, selectUser } from '../store/user/selectors';
import { selectCompany } from '../store/company/selectors';
import {
  getMyContractsSummary,
  getSharesProjection
} from '../store/contracts/thunks';
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
  const company = useSelector(selectCompany);

  const [projectedValuation, setProjectedValuation] = useState('');
  const [projectedDate, setProjectedDate] = useState('');
  const formValid = moment(new Date()).isBefore(
    moment(projectedDate).endOf('day')
  );

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
        currentValuation={company && company.currentValuation}
      />
      {sharesProjection && (
        <div style={{ position: 'relative' }}>
          <Title>Virtual Shares Projection</Title>
          <Button onClick={event => dispatch(setMySharesProjection(null))}>
            Reset Projections
          </Button>
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

const Button = styled.button`
  width: 150px;
  position: absolute;
  top: 25px;
  right: 0;
  font-size: 0.8rem;
  padding: 8px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-nav-hover);
  color: var(--color-white);

  &:hover {
    cursor: pointer;
  }
`;

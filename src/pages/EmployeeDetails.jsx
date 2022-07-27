import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { Container, Title } from '../styled';
import {
  BarChartShares,
  Cards,
  EmployeeTableShares,
  ProjectionForm
} from '../components';
import {
  getEmployeeContractsSummary,
  getSharesProjection
} from '../store/contracts/thunks';
import {
  selectEmployeeContractsSummary,
  selectEmployeeSharesProjection
} from '../store/contracts/selectors';
import { selectCompany } from '../store/company/selectors';
import { setEmployeeSharesProjection } from '../store/contracts/slice';

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const contractsSummary = useSelector(selectEmployeeContractsSummary);
  const sharesProjection = useSelector(selectEmployeeSharesProjection);
  const company = useSelector(selectCompany);

  const [projectedValuation, setProjectedValuation] = useState('');
  const [projectedDate, setProjectedDate] = useState('');
  const formValid = moment(new Date()).isBefore(
    moment(projectedDate).endOf('day')
  );

  useEffect(() => {
    dispatch(getEmployeeContractsSummary(id));
  }, [dispatch, id]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(getSharesProjection(projectedValuation, projectedDate, id));
  };

  if (!contractsSummary) {
    return (
      <Container>
        <Title>The employee doesn't have any contract...</Title>
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
      <Title>{contractsSummary.name}'s Details Page</Title>
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
          <Button
            onClick={event => dispatch(setEmployeeSharesProjection(null))}
          >
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

export { EmployeeDetails };

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

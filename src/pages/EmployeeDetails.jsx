import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Title } from '../styled';
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
      <Container>
        <Title>The employee doesn't have any contract...</Title>
      </Container>
    );
  }

  const { employeeContractsSummary, grantedXOwnedShares } = contractsSummary;

  return (
    <Container>
      <Title>{contractsSummary.name}'s Details Page</Title>
      <div>
        <BarChartShares data={grantedXOwnedShares} />
      </div>
      <h2>{contractsSummary.name}'s summary table</h2>
      <div>
        <EmployeeTableShares contracts={employeeContractsSummary} />
      </div>
    </Container>
  );
};

export { EmployeeDetails };

import { Title } from '../styled';
import { Container } from '../styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeesContractsSummary } from '../store/contracts/thunks';
import { selectAllEmployeeContractsSummary } from '../store/contracts/selectors';
import { CompanyTableShares } from '../components';

const CompanyDashboard = () => {
  const dispatch = useDispatch();
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);

  useEffect(() => {
    dispatch(getAllEmployeesContractsSummary());
  }, [dispatch]);

  if (!allEmployeeContracts) {
    return (
      <Container>
        <Title>Homepage loading...</Title>
      </Container>
    );
  }

  return (
    <Container dashboard>
      <CompanyTableShares contracts={allEmployeeContracts} />
    </Container>
  );
};

export { CompanyDashboard };

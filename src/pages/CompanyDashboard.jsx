import { Title } from '../styled';
import { Link } from 'react-router-dom';
import { LinkWord } from '../styled';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeesContractsSummary } from '../store/contracts/thunks';
import { selectAllEmployeeContractsSummary } from '../store/contracts/selectors';
import { CompanyTableShares } from '../components/CompanyTableShares';

const CompanyDashboard = () => {
  const dispatch = useDispatch();
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);

  useEffect(() => {
    dispatch(getAllEmployeesContractsSummary());
  }, [dispatch]);

  if (!allEmployeeContracts) {
    return (
      <div>
        <h2>Homepage loading...</h2>
      </div>
    );
  }

  return (
    <Container>
      <h2>Summary table</h2>
      <div>
        <CompanyTableShares contracts={allEmployeeContracts} />
      </div>
    </Container>
  );
};

export { CompanyDashboard };

const Container = styled.div`
  margin: 20px;
`;

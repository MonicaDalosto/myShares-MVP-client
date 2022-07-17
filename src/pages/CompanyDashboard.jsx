import { Title } from '../styled';
import { Link } from 'react-router-dom';
import { Container, LinkWord } from '../styled';
import styled from 'styled-components';
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
      <Title>Summary table</Title>
      <CompanyTableShares contracts={allEmployeeContracts} />
    </Container>
  );
};

export { CompanyDashboard };

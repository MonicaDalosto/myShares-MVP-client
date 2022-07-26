import { Title } from '../styled';
import { Container } from '../styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../store/user/selectors';
import { getAllEmployeesContractsSummary } from '../store/contracts/thunks';
import {
  selectAllEmployeeContractsSummary,
  selectTheTotalOfCompanyShares,
  selectTheTotalPerYearOfCompanyShares
} from '../store/contracts/selectors';
import { BarChartShares, Cards, CompanyTableShares } from '../components';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);
  const theTotalOfCompanyShares = useSelector(selectTheTotalOfCompanyShares);
  const totalOfContractsPerYear = useSelector(
    selectTheTotalPerYearOfCompanyShares
  );

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    dispatch(getAllEmployeesContractsSummary());
  }, [dispatch, token, navigate]);

  if (!allEmployeeContracts) {
    return (
      <Container>
        <Title>Homepage loading...</Title>
      </Container>
    );
  }

  return (
    <Container dashboard>
      <Cards totalContracts={theTotalOfCompanyShares} />
      <BarChartShares data={totalOfContractsPerYear} />
      <CompanyTableShares contracts={allEmployeeContracts} />
    </Container>
  );
};

export { CompanyDashboard };

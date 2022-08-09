import { Container, Title } from '../styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUser } from '../store/user/selectors';
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
  const user = useSelector(selectUser);
  const isAdmin = !user ? false : user.isAdmin;
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);
  const theTotalOfCompanyShares = useSelector(selectTheTotalOfCompanyShares);
  const totalOfContractsPerYear = useSelector(
    selectTheTotalPerYearOfCompanyShares
  );

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [dispatch, token, navigate, isAdmin]);

  if (!allEmployeeContracts) {
    return (
      <Container>
        <Title>Company's Dashboard loading...</Title>
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

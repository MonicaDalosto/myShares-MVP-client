import { Title } from '../styled';
import { Container } from '../styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../store/user/selectors';
import { getAllEmployeesContractsSummary } from '../store/contracts/thunks';
import { selectAllEmployeeContractsSummary } from '../store/contracts/selectors';
import { CompanyTableShares } from '../components';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);

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
      <CompanyTableShares contracts={allEmployeeContracts} />
    </Container>
  );
};

export { CompanyDashboard };

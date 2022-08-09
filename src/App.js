import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getUserWithStoredToken } from './store/user/thunks';
import { getCompany } from './store/company/thunks';
import { selectToken, selectUser } from './store/user/selectors';
import { getAllEmployeesContractsSummary } from './store/contracts/thunks';
import { getAllEmployees } from './store/employees/thunks';
import { Navigation, MessageBox, Footer } from './components';
import {
  CompanyDashboard,
  CompanySettings,
  ContractSettings,
  EditEmployee,
  EmployeeChangePassword,
  EmployeeDashboard,
  EmployeeDetails,
  EmployeeSettings,
  ForgotPasswordEmail,
  Login,
  ResetPassword
} from './pages';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isAdmin = !user ? false : user.isAdmin;

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    if (token && isAdmin) {
      dispatch(getCompany());
      dispatch(getAllEmployees());
      dispatch(getAllEmployeesContractsSummary());
    }
  }, [dispatch, token, isAdmin]);

  return (
    <AppContainer>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/employee-password" element={<EmployeeChangePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordEmail />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/employee" element={<EmployeeSettings />} />
        <Route path="/edit-employee/:id/:index" element={<EditEmployee />} />
        <Route path="/contract" element={<ContractSettings />} />
        <Route path="/company" element={<CompanySettings />} />
        <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

export default App;

import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getUserWithStoredToken } from './store/user/thunks';
import { getCompany } from './store/company/thunks';
import { selectUser, selectToken } from './store/user/selectors';
import { getAllEmployeesContractsSummary } from './store/contracts/thunks';
import { getAllEmployees } from './store/employees/thunks';
import { Navigation, MessageBox } from './components';
import {
  CompanyDashboard,
  CompanySettings,
  ContractSettings,
  EditEmployee,
  EmployeeDashboard,
  EmployeeDetails,
  EmployeeSettings,
  Login,
  SignUp
} from './pages';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  // console.log('user ', user);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    if (token) {
      dispatch(getCompany());
      dispatch(getAllEmployees());
    }
  }, [dispatch, token]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<EmployeeSettings />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/contract" element={<ContractSettings />} />
        <Route path="/company" element={<CompanySettings />} />
        <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

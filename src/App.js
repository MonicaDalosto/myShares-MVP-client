import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getUserWithStoredToken } from './store/user/thunks';
import { getCompany } from '../src/store/company/thunks';
import { selectUser } from '../src/store/user/selectors';
import { getAllEmployeesContractsSummary } from '../src/store/contracts/thunks';
import { Navigation, MessageBox } from './components';
import {
  CompanyDashboard,
  CompanySettings,
  ContractSettings,
  EditEmployee,
  EmployeeDashboard,
  EmployeeSettings,
  Login,
  SignUp
} from './pages';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(getCompany());
    // if (user && user.isAdmin) {
    //   dispatch(getAllEmployeesContractsSummary());
    // }
  }, [dispatch]);

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
        <Route path="/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

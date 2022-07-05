import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getUserWithStoredToken } from './store/user/thunks';
import { getCompany } from '../src/store/company/thunks';
import { Navigation, MessageBox } from './components';
import {
  CompanySettings,
  CreateContract,
  CreateEmployee,
  EmployeeDashboard,
  Homepage,
  Login,
  SignUp
} from './pages';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(getCompany());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee/settings" element={<CreateEmployee />} />
        <Route path="/contract/settings" element={<CreateContract />} />
        <Route path="/company/settings" element={<CompanySettings />} />
        <Route path="/mydashboard" element={<EmployeeDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './appState/slice';
import userReducer from './user/slice';
import contractsReducer from './contracts/slice';
import companyReducer from './company/slice';
import employeesReducer from './employees/slice';

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    contracts: contractsReducer,
    company: companyReducer,
    employees: employeesReducer
  }
});

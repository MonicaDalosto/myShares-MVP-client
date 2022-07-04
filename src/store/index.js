import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './appState/slice';
import userReducer from './user/slice';
import contractReducer from './contracts/slice';

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    contracts: contractReducer
  }
});

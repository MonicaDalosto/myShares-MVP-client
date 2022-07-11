import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myContractsSummary: null,
  employeeContractsSummary: null,
  allEmployeeContractsSummary: null
};

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setMyContractsSummary: (state, action) => {
      state.myContractsSummary = action.payload;
    },
    setEmployeeContractsSummary: (state, action) => {
      state.employeeContractsSummary = action.payload;
    },
    setAllEmployeeContractsSummary: (state, action) => {
      state.allEmployeeContractsSummary = action.payload;
    }
  }
});

export const {
  setMyContractsSummary,
  setEmployeeContractsSummary,
  setAllEmployeeContractsSummary
} = contractsSlice.actions;

export default contractsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allEmployees: null,
  employeeContractsSummary: null,
  allEmployeeContractsSummary: null
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setAllEmployees: (state, action) => {
      state.allEmployees = action.payload;
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
  setAllEmployees,
  setEmployeeContractsSummary,
  setAllEmployeeContractsSummary
} = employeeSlice.actions;

export default employeeSlice.reducer;

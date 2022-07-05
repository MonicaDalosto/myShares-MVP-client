import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allEmployees: null,
  employeeContractsSummary: null
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
    }
  }
});

export const { setAllEmployees, setEmployeeContractsSummary } =
  employeeSlice.actions;

export default employeeSlice.reducer;

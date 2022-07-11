import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeContractsSummary: null,
  allEmployeeContractsSummary: null
};

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setEmployeeContractsSummary: (state, action) => {
      state.employeeContractsSummary = action.payload;
    },
    setAllEmployeeContractsSummary: (state, action) => {
      state.allEmployeeContractsSummary = action.payload;
    }
  }
});

export const { setEmployeeContractsSummary, setAllEmployeeContractsSummary } =
  contractsSlice.actions;

export default contractsSlice.reducer;

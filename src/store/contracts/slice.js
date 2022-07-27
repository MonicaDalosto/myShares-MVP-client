import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myContractsSummary: null,
  mySharesProjection: null,
  employeeContractsSummary: null,
  employeeSharesProjection: null,
  allEmployeeContractsSummary: null
};

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setMyContractsSummary: (state, action) => {
      state.myContractsSummary = action.payload;
    },
    setMySharesProjection: (state, action) => {
      state.mySharesProjection = action.payload;
    },
    setEmployeeContractsSummary: (state, action) => {
      state.employeeContractsSummary = action.payload;
    },
    setEmployeeSharesProjection: (state, action) => {
      state.employeeSharesProjection = action.payload;
    },
    setAllEmployeeContractsSummary: (state, action) => {
      state.allEmployeeContractsSummary = action.payload;
    }
  }
});

export const {
  setMyContractsSummary,
  setMySharesProjection,
  setEmployeeContractsSummary,
  setEmployeeSharesProjection,
  setAllEmployeeContractsSummary
} = contractsSlice.actions;

export default contractsSlice.reducer;

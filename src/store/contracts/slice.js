import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allEmployees: null
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setAllEmployees: (state, action) => {
      state.allEmployees = action.payload;
    }
  }
});

export const { setAllEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;

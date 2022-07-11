import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allEmployees: null,
  specificEmployee: null
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setAllEmployees: (state, action) => {
      state.allEmployees = action.payload;
    },
    setSpecificEmployee: (state, action) => {
      state.specificEmployee = action.payload;
    }
  }
});

export const { setAllEmployees, setSpecificEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;

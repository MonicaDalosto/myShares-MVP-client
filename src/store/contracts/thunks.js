import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { showMessageWithTimeout } from '../appState/thunks';
import {
  setAllEmployees,
  setEmployeeContractsSummary,
  setAllEmployeeContractsSummary
} from './slice';

export const getAllEmployees = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/employees`);
    dispatch(setAllEmployees(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const createNewContract =
  (
    employeeId,
    signatureDate,
    companyValuation,
    totalCompanyShares,
    grantedShares,
    cliffDate
  ) =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      await axios.post(
        `${apiUrl}/contracts`,
        {
          signatureDate,
          companyValuation,
          totalCompanyShares,
          grantedShares,
          cliffDate,
          employeeId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // console.log(response.data);
      // dispatch(setAllEmployees(response.data));
      dispatch(showMessageWithTimeout('success', true, 'Contract created!'));
    } catch (error) {
      console.log(error.response);
    }
  };

export const getEmployeeContractsSummary = id => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.get(`${apiUrl}/employees/calculation/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // console.log('employee contracts summary: ', response.data);
    dispatch(setEmployeeContractsSummary(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllEmployeesContractsSummary =
  () => async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      const response = await axios.get(
        `${apiUrl}/employees/all-employees-calculation`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // console.log(response.data);
      dispatch(setAllEmployeeContractsSummary(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

import { apiUrl } from '../../config/constants';
import axios from 'axios';
import moment from 'moment';
import { showMessageWithTimeout } from '../appState/thunks';
import {
  setMyContractsSummary,
  setMySharesProjection,
  setEmployeeContractsSummary,
  setAllEmployeeContractsSummary
} from './slice';

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
      dispatch(showMessageWithTimeout('success', true, 'Contract created!'));
    } catch (error) {
      console.log(error.response);
    }
  };

export const getMyContractsSummary = () => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.get(`${apiUrl}/contracts/calculation`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch(setMyContractsSummary(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const getSharesProjection =
  (projectedValuation, projectedDate, id) => async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      const response = await axios.get(`${apiUrl}/contracts/calculation`, {
        params: {
          projectedValuation,
          projectedDate,
          id
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      // console.log('projection inside the thunk: ', response.data);
      dispatch(setMySharesProjection(response.data));
    } catch (error) {
      console.log(error.response);
    }
  };

export const getEmployeeContractsSummary = id => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.get(`${apiUrl}/contracts/calculation`, {
      params: { id },
      headers: { Authorization: `Bearer ${token}` }
    });
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
        `${apiUrl}/contracts/all-employees-calculation`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      dispatch(setAllEmployeeContractsSummary(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteContract = id => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.delete(`${apiUrl}/contracts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(response.data.message);
    dispatch(getAllEmployeesContractsSummary());
    dispatch(showMessageWithTimeout('success', true, response.data.message));
  } catch (error) {
    console.log(error.message);
  }
};

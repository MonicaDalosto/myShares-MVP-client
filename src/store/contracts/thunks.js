import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { showMessageWithTimeout } from '../appState/thunks';
import { setAllEmployees } from './slice';

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

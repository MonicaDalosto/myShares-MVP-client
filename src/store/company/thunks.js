import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { showMessageWithTimeout } from '../appState/thunks';
import { setCompany } from './slice';

export const getCompany = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/company`);
    dispatch(setCompany(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCompanyData =
  (name, currentValuation, totalCompanyShares) =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      const response = await axios.put(
        `${apiUrl}/company`,
        {
          name,
          currentValuation,
          totalCompanyShares
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // console.log(response.data);

      dispatch(setCompany(response.data));
      dispatch(
        showMessageWithTimeout(
          'success',
          true,
          'The Company Valuation was updated!'
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

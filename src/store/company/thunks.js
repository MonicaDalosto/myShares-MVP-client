import { apiUrl } from '../../config/constants';
import axios from 'axios';
// import { showMessageWithTimeout } from '../appState/thunks';
import { setCompany } from './slice';

export const getCompany = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/company`);
    dispatch(setCompany(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { showMessageWithTimeout } from '../appState/thunks';
import { setAllEmployees } from './slice';

export const getAllEmployees = () => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.get(`${apiUrl}/employees`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setAllEmployees(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

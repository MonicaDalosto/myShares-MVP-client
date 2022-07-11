import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { showMessageWithTimeout } from '../appState/thunks';
import { setAllEmployees, setSpecificEmployee } from './slice';

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

export const getSpecificEmployee = id => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.get(`${apiUrl}/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setSpecificEmployee(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

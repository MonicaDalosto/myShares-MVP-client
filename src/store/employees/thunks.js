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

export const updateEmployee =
  ({ id, name, email, isAdmin, startDate, department, isActive, endDate }) =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      await axios.put(
        `${apiUrl}/employees/update/${id}`,
        { name, email, isAdmin, startDate, department, isActive, endDate },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      dispatch(getAllEmployees());
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteEmployee = id => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const response = await axios.delete(`${apiUrl}/employees/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch(showMessageWithTimeout('success', true, response.data.message));

    dispatch(getAllEmployees());
  } catch (error) {
    console.log(error.message);
  }
};

// export const getSpecificEmployee = id => async (dispatch, getState) => {
//   try {
//     const token = getState().user.token;
//     const response = await axios.get(`${apiUrl}/employees/${id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     dispatch(setSpecificEmployee(response.data));
//   } catch (error) {
//     console.log(error.message);
//   }
// };

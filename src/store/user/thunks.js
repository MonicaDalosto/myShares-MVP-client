import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from './selectors';
import { showMessageWithTimeout } from '../appState/thunks';
import { getAllEmployees } from '../employees/thunks';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';
import { loginSuccess, logOut, tokenStillValid } from './slice';

export const createEmployee = ({
  name,
  email,
  department,
  password,
  isAdmin,
  startDate
}) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      // const token = selectToken(getState()); // it's the same
      const token = getState().user.token;

      const response = await axios.post(
        `${apiUrl}/auth/createEmployee`,
        {
          name,
          email,
          department,
          password,
          isAdmin,
          startDate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      dispatch(showMessageWithTimeout('success', true, response.data.message));

      dispatch(getAllEmployees());
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.response.data.message
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.message
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.response.data.message
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.response.data.message
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const changePassword =
  ({ password, newPassword, confirmNewPassword }) =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      const response = await axios.patch(
        `${apiUrl}/auth/changePassword`,
        { password, newPassword, confirmNewPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      dispatch(showMessageWithTimeout('success', true, response.data.message));
    } catch (error) {
      dispatch(
        showMessageWithTimeout('danger', true, error.response.data.message)
      );
    }
  };

export const forgotPassword = email => async (dispatch, getState) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/forgotPassword`, {
      email
    });

    dispatch(showMessageWithTimeout('success', true, response.data.message));
  } catch (error) {
    dispatch(
      showMessageWithTimeout('danger', true, error.response.data.message)
    );
  }
};

export const checkResetPasswordToken =
  (resetToken, navigate) => async (dispatch, getState) => {
    try {
      await axios.post(`${apiUrl}/auth/checkResetPasswordToken`, {
        resetToken
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch(
        showMessageWithTimeout(
          'danger',
          true,
          'The url is expired! Please, request for your password to be reset again. '
        )
      );
      navigate('/forgot-password');
    }
  };

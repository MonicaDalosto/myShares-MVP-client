import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Title, Formulary, Button, TabContainer } from '../styled';
import { selectToken, selectUser } from '../store/user/selectors';
import { changePassword } from '../store/user/thunks';
import {
  validPassword,
  lowercaseLetter,
  uppercaseLetter,
  specialCharacter,
  numberCharacter,
  minimumLength
} from '../config/regex';

const EmployeeChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const [newPwdError, setNewPwdError] = useState(false);
  const [confirmNewPwdError, setConfirmNewPwdError] = useState(false);

  const isFormValid =
    password &&
    newPassword &&
    confirmNewPassword &&
    // !pwdError &&
    !newPwdError &&
    !confirmNewPwdError;

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
  }, [navigate, token]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(changePassword({ password, newPassword, confirmNewPassword })); // add the thunk...
    setPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <Container>
      <TabContainer>
        <Title>Change your Password</Title>
        <Formulary onSubmit={submitForm}>
          <label>
            Name
            <input value={user && user.name} disabled />
          </label>
          <label>
            Email
            <input value={user && user.email} disabled />
          </label>
          <label>
            Current Password
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              onBlur={event =>
                setPwdError(!validPassword.test(event.target.value))
              }
              className={pwdError ? 'invalid-data' : undefined}
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
              onBlur={event =>
                setNewPwdError(
                  !validPassword.test(event.target.value) ||
                    password === event.target.value
                )
              }
              className={newPwdError ? 'invalid-data' : undefined}
            />
          </label>
          <label>
            Confirm new Password
            <input
              type="password"
              value={confirmNewPassword}
              onChange={event => setConfirmNewPassword(event.target.value)}
              onBlur={event =>
                setConfirmNewPwdError(
                  !validPassword.test(event.target.value) ||
                    newPassword !== event.target.value
                )
              }
              className={confirmNewPwdError ? 'invalid-data' : undefined}
            />
          </label>
          <Button type="submit" disabled={!isFormValid}>
            Submit
          </Button>
          {pwdError && <Paragraph>The "Password" is invalid</Paragraph>}
          {newPwdError && (
            <Ul>
              {/* The "New Password" is invalid: */}
              <li className={password !== newPassword ? 'valid' : 'invalid'}>
                The "New Password" must be different from the current password
              </li>
              <li
                className={
                  newPassword.length >= minimumLength ? 'valid' : 'invalid'
                }
              >
                The "New Password" must be at least 8 characters
              </li>
              <li
                className={
                  newPassword.match(lowercaseLetter) ? 'valid' : 'invalid'
                }
              >
                The "New Password" must contain at least one lowercase letter
              </li>
              <li
                className={
                  newPassword.match(uppercaseLetter) ? 'valid' : 'invalid'
                }
              >
                The "New Password" must contain at least one uppercase letter
              </li>
              <li
                className={
                  newPassword.match(numberCharacter) ? 'valid' : 'invalid'
                }
              >
                The "New Password" must contain at least one number
              </li>
              <li
                className={
                  newPassword.match(specialCharacter) ? 'valid' : 'invalid'
                }
              >
                The "New Password" must contain at least one special character
              </li>
            </Ul>
          )}
          {confirmNewPwdError && (
            <Paragraph>
              The "New Password" and "Confirm Password" must be the same
            </Paragraph>
          )}
        </Formulary>
      </TabContainer>
    </Container>
  );
};

export { EmployeeChangePassword };

const Paragraph = styled.p`
  margin: 10px 0;
  color: var(--color-alert-red);
  font-size: 0.9rem;
`;

const Ul = styled.ul`
  margin: 10px 0;
  color: var(--color-alert-red);
  font-size: 0.9rem;
  list-style: none;

  li {
    margin: 5px 0;

    &.valid {
      color: green;
    }
  }
`;

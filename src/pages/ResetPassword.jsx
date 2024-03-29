import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Title, Container, Formulary } from '../styled';
import {
  validPassword,
  lowercaseLetter,
  uppercaseLetter,
  specialCharacter,
  numberCharacter,
  minimumLength
} from '../config/regex';
import { checkResetPasswordToken, resetPassword } from '../store/user/thunks';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');

  useEffect(() => {
    dispatch(checkResetPasswordToken(resetToken, navigate));
  }, [dispatch, resetToken, navigate]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(
      resetPassword({ resetToken, password, confirmPassword, navigate })
    );
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <SubText caption>Please enter a new Password</SubText>
      <Formulary login onSubmit={submitForm}>
        <label>
          Password
          <input
            autoFocus
            type="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
              setPwdError(!validPassword.test(event.target.value));
            }}
            onBlur={event =>
              setPwdError(!validPassword.test(event.target.value))
            }
            className={pwdError ? 'invalid-data' : undefined}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            onBlur={event =>
              setConfirmPwdError(
                !validPassword.test(event.target.value) ||
                  password !== event.target.value
              )
            }
            className={confirmPwdError ? 'invalid-data' : undefined}
          />
        </label>
        <Button type="submit" disabled={pwdError || confirmPwdError}>
          Retrieve Password
        </Button>
        {pwdError && (
          <Ul>
            <li
              className={password.length >= minimumLength ? 'valid' : 'invalid'}
            >
              The Password must be at least 8 characters
            </li>
            <li
              className={password.match(lowercaseLetter) ? 'valid' : 'invalid'}
            >
              The Password must contain at least one lowercase letter
            </li>
            <li
              className={password.match(uppercaseLetter) ? 'valid' : 'invalid'}
            >
              The Password must contain at least one uppercase letter
            </li>
            <li
              className={password.match(numberCharacter) ? 'valid' : 'invalid'}
            >
              The Password must contain at least one number
            </li>
            <li
              className={password.match(specialCharacter) ? 'valid' : 'invalid'}
            >
              The Password must contain at least one special character
            </li>
          </Ul>
        )}
        {confirmPwdError && (
          <Paragraph>
            The "Password" and "Confirm Password" must be the same
          </Paragraph>
        )}
      </Formulary>
    </Container>
  );
};

export { ResetPassword };

const SubText = styled.p`
  text-align: center;
  color: var(--color-title);
  margin: ${props => (props.caption ? '20px 0 -20px' : '-20px 0 0')};
  font-size: 0.9rem;
`;

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

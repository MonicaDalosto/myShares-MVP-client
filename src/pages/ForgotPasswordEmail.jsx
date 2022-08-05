import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Title, LinkWord, Container, Formulary } from '../styled';
import { validEmail } from '../config/regex';
import { forgotPassword } from '../store/user/thunks';

const ForgotPasswordEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const submitForm = event => {
    event.preventDefault();
    dispatch(forgotPassword(email));
    setEmail('');
  };
  return (
    <Container>
      <Title>Forgot Password</Title>
      <SubText caption>
        Enter your e-mail address and we'll send you a link to reset your
        password.
      </SubText>
      <Formulary login onSubmit={submitForm}>
        <label>
          Email Address
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            onBlur={event =>
              setEmailError(!validEmail.test(event.target.value))
            }
          />
        </label>
        <Button type="submit" disabled={emailError || !email}>
          Retrieve Password
        </Button>
        {emailError && <Paragraph>The informed Email is invalid!</Paragraph>}
      </Formulary>
      <SubText>
        Back to
        <Link to="/login" style={LinkWord}>
          {' '}
          Login
        </Link>{' '}
      </SubText>
    </Container>
  );
};

export { ForgotPasswordEmail };

const SubText = styled.p`
  text-align: center;
  color: var(--color-title);
  margin: ${props => (props.caption ? '20px 0 -20px' : '-20px 0 0')};
  font-size: ${props => props.caption && '0.9rem'};
`;

const Paragraph = styled.p`
  margin: 10px 0;
  color: var(--color-alert-red);
  font-size: 0.9rem;
`;

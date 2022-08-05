import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Title, LinkWord, Container, Formulary } from '../styled';

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const submitForm = event => {
    event.preventDefault();
    dispatch(); // add the thunk;
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
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <Button type="submit">Retrieve Password</Button>
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

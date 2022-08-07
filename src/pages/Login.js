import styled from 'styled-components';
import { Button, Title, LinkWord, Container, Formulary } from '../styled';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/user/thunks';
import { selectToken } from '../store/user/selectors';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate('/');
    }
  }, [token, navigate]);

  const submitForm = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <Title>Login</Title>
      <Formulary login onSubmit={submitForm}>
        <input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Button type="submit">Login</Button>
      </Formulary>
      <SubText>
        Don't remember your password? Click
        <Link to="/forgot-password" style={LinkWord}>
          {' '}
          here
        </Link>{' '}
      </SubText>
    </Container>
  );
};

const SubText = styled.p`
  text-align: center;
  color: var(--color-title);
`;

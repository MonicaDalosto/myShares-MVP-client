import styled from 'styled-components';
import { Button, Input, Title, LinkWord } from '../styled';
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
    // <div style={{ textAlign: 'center' }}>
    <Container>
      <Title>Login</Title>
      <form onSubmit={submitForm}>
        <Input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
      <SubText>
        Don't remember your password? Click
        <Link to="/" style={LinkWord}>
          {' '}
          here
        </Link>{' '}
      </SubText>
    </Container>
    // </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15%;

  form {
    display: flex;
    flex-direction: column;
  }
`;

const SubText = styled.p`
  text-align: center;
  color: var(--color-title);
  padding: 20px 0px 5px 0px;
`;

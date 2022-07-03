import styled from 'styled-components';
import { Button, Input, Title, LinkWord } from '../styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../store/user/thunks';
import { selectToken } from '../store/user/selectors';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [startDate, setStartDate] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [token, navigate]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(signUp(name, email, department, password, isAdmin, startDate));
    setName('');
    setEmail('');
    setDepartment('');
    setPassword('');
    setStartDate('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Container>
        <Title>Create new employee</Title>
        <form
          style={{ display: 'flex', flexDirection: 'column' }} // in the future, I should change this style for styled components.
          onSubmit={submitForm}
        >
          <label>
            Name
            <input
              // placeholder="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </label>
          <label>
            Email
            <input
              // placeholder="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          {/* Change to selector, with pre-determined values */}
          <label>
            Department
            <select
              value={department}
              onChange={event => setDepartment(event.target.value)}
            >
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="R&D">R&D</option>
            </select>
          </label>
          <label>
            Initial Password
            <input
              type="password"
              // placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
          {/* Change to checkbox, with false initial value */}
          <label>
            Access
            <input
              type="checkbox"
              value={isAdmin}
              onChange={event => setIsAdmin(!isAdmin)}
            />{' '}
            is Admin
          </label>
          {/* Change to date input */}
          <label>
            Start Date
            <input
              type="date"
              // placeholder="start date"
              value={startDate}
              onChange={event => setStartDate(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Create employee</button>
        </form>
      </Container>
    </div>
  );
};

export { CreateEmployee };

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`;

const SubText = styled.p`
  text-align: center;
  color: #000050;
  padding: 20px 0px 5px 0px;
`;

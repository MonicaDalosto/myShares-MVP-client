import styled from 'styled-components';
import { Button, Input, Title, Container, Tabs, Panels } from '../styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../store/user/thunks';
import { selectToken } from '../store/user/selectors';
import { getAllEmployees } from '../store/employees/thunks';
import { selectAllEmployees } from '../store/employees/selectors';
import { EmployeesList } from '../components';

const EmployeeSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allEmployees = useSelector(selectAllEmployees);
  const token = useSelector(selectToken);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = index => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [startDate, setStartDate] = useState('');

  const formValid =
    name && email && department && password && startDate ? true : false;

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    dispatch(getAllEmployees());
  }, [dispatch, token, navigate]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(
      createEmployee({ name, email, department, password, isAdmin, startDate })
    );
    setName('');
    setEmail('');
    setDepartment('');
    setPassword('');
    setStartDate('');
  };

  if (!allEmployees) {
    return (
      <Container>
        <Title>You don't have any Employees!</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Tabs>
        <button
          className={`tab ${checkActive(0, 'active')}`}
          onClick={() => handleClick(0)}
        >
          Employees List
        </button>
        <button
          className={`tab ${checkActive(1, 'active')}`}
          onClick={() => handleClick(1)}
        >
          Create new Employee
        </button>
      </Tabs>
      <Panels>
        <div className={`panel ${checkActive(0, 'active')}`}>
          <Title>Employee Settings</Title>
          <EmployeesList allEmployees={allEmployees} />
        </div>
        <div className={`panel ${checkActive(1, 'active')}`}>
          <Title>Create new employee</Title>
          <form onSubmit={submitForm}>
            <label>
              Name
              <input
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </label>
            <label>
              Email
              <input
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </label>
            <label>
              Department
              <select
                value={department}
                onChange={event =>
                  setDepartment(
                    event.target.value === 'Choose department'
                      ? ''
                      : event.target.value
                  )
                }
              >
                <option>Choose department</option>
                <option>Finance</option>
                <option>HR</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>R&D</option>
              </select>
            </label>
            <label>
              Initial Password
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </label>
            <label>
              Access
              <input
                type="checkbox"
                value={isAdmin}
                onChange={event => setIsAdmin(!isAdmin)}
              />{' '}
              is Admin
            </label>
            <label>
              Start Date
              <input
                type="date"
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
              />
            </label>
            <br />
            <button type="submit" disabled={!formValid}>
              Create employee
            </button>
          </form>
        </div>
      </Panels>
    </Container>
  );
};

export { EmployeeSettings };

// const Container = styled.div`
//   display: 'flex';
//   flex-direction: 'column';
//   margin: 15%;
// `;

// const SubText = styled.p`
//   text-align: center;
//   color: #000050;
//   padding: 20px 0px 5px 0px;
// `;

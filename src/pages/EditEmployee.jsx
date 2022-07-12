import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectToken } from '../store/user/selectors';
import { updateEmployee } from '../store/employees/thunks';
import { selectSpecificEmployee } from '../store/employees/selectors';

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const token = useSelector(selectToken);
  const user = useSelector(selectSpecificEmployee(parseInt(id)));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isActive, setIsActive] = useState('');
  const [department, setDepartment] = useState('');
  const [endDate, setEndDate] = useState('');
  const [check, setCheck] = useState(false);

  const endDateValid = isActive || (!isActive && endDate);
  const formValid =
    name && email && startDate && department && endDateValid && check
      ? true
      : false;

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setStartDate(
        new Date(user.employee.startDate).toISOString().split('T')[0]
      );
      setIsActive(user.employee.isActive);
      setDepartment(user.employee.department);
      setEndDate(
        user.employee.endDate
          ? new Date(user.employee.endDate).toISOString().split('T')[0]
          : null
      );
    }
  }, [dispatch, navigate, token, user]);

  const submitForm = event => {
    event.preventDefault();
    let dateToSend = endDate;
    if (isActive) {
      dateToSend = null;
    }
    dispatch(
      updateEmployee({
        id,
        name,
        email,
        isAdmin,
        startDate,
        department,
        isActive,
        endDate: dateToSend
      })
    );
    navigate('/employee');
  };

  if (!user) {
    return (
      <div>
        <h2>You don't have any Employees!</h2>
      </div>
    );
  }

  return (
    <Container>
      <h2>Edit Employee</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column' }} // in the future, I should change this style for styled components.
        onSubmit={submitForm}
      >
        <label>
          Name
          <input value={name} onChange={event => setName(event.target.value)} />
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
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={event => setStartDate(event.target.value)}
          />
        </label>
        <label>
          Access
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={event => setIsAdmin(!isAdmin)}
          />{' '}
          is Admin
        </label>
        <label>
          The employee
          <input
            type="checkbox"
            checked={isActive}
            onChange={event => setIsActive(!isActive)}
          />{' '}
          is Active
        </label>
        {!isActive && (
          <span>
            Not active means the employee is not working at the company anymore!
          </span>
        )}
        {!endDate && <span>You need fill an End Date to the Employee</span>}
        {!isActive && (
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={event => setEndDate(event.target.value)}
            />
          </label>
        )}
        <label>
          <input
            type="checkbox"
            value={check}
            onChange={event => setCheck(!check)}
          />{' '}
          Confirm the Employee's changes
        </label>
        <br />
        <button type="submit" disabled={!formValid}>
          Submit Edition
        </button>
      </form>
    </Container>
  );
};

export { EditEmployee };

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`;

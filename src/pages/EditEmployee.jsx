import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Tabs,
  Panels,
  Formulary,
  TabContainer,
  Button
} from '../styled';
import { selectToken, selectUser } from '../store/user/selectors';
import { updateEmployee, deleteEmployee } from '../store/employees/thunks';
import { selectSpecificEmployee } from '../store/employees/selectors';
import { Modal } from '../components';

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, index } = useParams();

  const token = useSelector(selectToken);
  const admin = useSelector(selectUser);
  const user = useSelector(selectSpecificEmployee(parseInt(id)));

  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = index => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : '';

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isActive, setIsActive] = useState('');
  const [department, setDepartment] = useState('');
  const [endDate, setEndDate] = useState('');
  const [check, setCheck] = useState('');
  const [contracts, setContracts] = useState(0);

  const userCanBeDeleted = !contracts;
  const theUserIsTheAdmin =
    user && Number(id) === Number(admin.id) && !isActive ? true : false;
  const endDateValid = isActive || (!isActive && endDate);
  const formValid =
    name &&
    email &&
    startDate &&
    department &&
    endDateValid &&
    !theUserIsTheAdmin &&
    check;

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    handleClick(Number(index)); // when the page is rendered, call the handleclick function with the index received from the useParams()
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
      setContracts(
        user.employee.contracts.length > 0 ? user.employee.contracts.length : ''
      );
    }
  }, [dispatch, navigate, token, user, index]);

  const submitEditForm = event => {
    event.preventDefault();
    let dateToSend = endDate;
    let isUserActive = isActive;
    if (Number(id) === Number(admin.id)) {
      // the Admin cannot set themselves as inactive
      isUserActive = true;
    }
    if (isUserActive) {
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
        isActive: isUserActive,
        endDate: dateToSend
      })
    );
    navigate('/employee');
  };

  const submitDeleteForm = event => {
    event.preventDefault();
    dispatch(deleteEmployee(id));
    navigate('/employee');
  };

  if (!user) {
    return (
      <Container>
        <Title>You don't have any Employees!</Title>
      </Container>
    );
  }

  return (
    <Container>
      <TabContainer forms>
        <Tabs>
          <button
            className={`tab ${checkActive(0, 'active')}`}
            onClick={() => handleClick(0)}
          >
            Edit Employee
          </button>
          <button
            className={`tab ${checkActive(1, 'active')}`}
            onClick={() => handleClick(1)}
          >
            Delete Employee
          </button>
        </Tabs>
        <Panels>
          <div className={`panel ${checkActive(0, 'active')}`}>
            <Formulary onSubmit={submitEditForm} s>
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
                Is the Employee Admin?
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={event => setIsAdmin(!isAdmin)}
                />
              </label>
              <label>
                Is the Employee Active?
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={event => setIsActive(!isActive)}
                />
              </label>
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
              {!isActive && !endDate && (
                <span>
                  If the employee is not active, you need fill an End Date!
                </span>
              )}
              <label>
                Confirm the changes?
                <input
                  checkbox={check ? 'true' : 'false'}
                  type="checkbox"
                  value={check}
                  onChange={event => setCheck(!check)}
                />
              </label>
              <br />
              <Button type="submit" disabled={!formValid}>
                Submit Edition
              </Button>
            </Formulary>
          </div>
          <div className={`panel ${checkActive(1, 'active')}`}>
            <Formulary>
              <label>Name: {name}</label>
              <label>Email: {email}</label>
              <label>Department: {department}</label>
              <label>Start Date: {startDate}</label>
              <label>
                {isAdmin
                  ? 'The employee is an Admin!'
                  : 'The employee is a regular user!'}
              </label>
              <label>
                {isActive
                  ? 'The employee is still active!'
                  : 'The employee is not active!'}
              </label>
              {!isActive && <label>End Date: {endDate}</label>}
              {contracts && (
                <label>
                  <strong>
                    The employee can't be deleted because has {contracts} active
                    contracts.
                  </strong>{' '}
                  You should delete all the contracts before delete the
                  employee.{' '}
                </label>
              )}
              <br />
              <Button
                type="button"
                disabled={!userCanBeDeleted}
                onClick={() => setIsOpen(true)}
              >
                Delete employee
              </Button>
              {isOpen && (
                <Modal
                  setIsOpen={setIsOpen}
                  submitDeleteForm={submitDeleteForm}
                  name={name}
                />
              )}
            </Formulary>
          </div>
        </Panels>
      </TabContainer>
    </Container>
  );
};

export { EditEmployee };

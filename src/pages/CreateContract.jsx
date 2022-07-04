import styled from 'styled-components';
import { Button, Input, Title, LinkWord } from '../styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees, createNewContract } from '../store/contracts/thunks';
import { selectToken } from '../store/user/selectors';
import { selectAllEmployees } from '../store/contracts/selectors';

const CreateContract = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const allEmployees = useSelector(selectAllEmployees);

  const [employeeId, setEmployeeId] = useState('');
  const [signatureDate, setSignatureDate] = useState('');
  const [companyValuation, setCompanyValuation] = useState('');
  const [totalCompanyShares, setTotalCompanyShares] = useState('');
  const [grantedShares, setGrantedShares] = useState('');
  const [cliffDate, setCliffDate] = useState('');

  const formValid =
    employeeId &&
    signatureDate &&
    companyValuation &&
    totalCompanyShares &&
    grantedShares &&
    cliffDate
      ? true
      : false;

  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
    dispatch(getAllEmployees());
  }, [dispatch, token, navigate]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(
      createNewContract(
        Number(employeeId),
        signatureDate,
        parseFloat(companyValuation),
        Number(totalCompanyShares),
        parseFloat(grantedShares),
        cliffDate
      )
    );
    setSignatureDate('');
    setCompanyValuation('');
    setTotalCompanyShares('');
    setGrantedShares('');
    setCliffDate('');
    setEmployeeId('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Container>
        <Title>Create new contract</Title>
        <form
          style={{ display: 'flex', flexDirection: 'column' }} // in the future, I should change this style for styled components.
          onSubmit={submitForm}
        >
          <label>
            Employee
            <select
              value={employeeId}
              onChange={event => setEmployeeId(event.target.value)}
            >
              <option>All Employees</option>
              {!allEmployees ? (
                <option>You don't have employees</option>
              ) : (
                allEmployees.map(employee => (
                  <option
                    key={employee.employee.id}
                    value={employee.employee.id}
                  >
                    {employee.name}
                  </option>
                ))
              )}
            </select>
          </label>
          <label>
            Signature Date
            <input
              type="date"
              value={signatureDate}
              onChange={event => setSignatureDate(event.target.value)}
            />
          </label>
          <label>
            Granted Shares
            <input
              value={grantedShares}
              onChange={event => setGrantedShares(event.target.value)}
            />
          </label>
          <label>
            Company Valuation:
            <input
              value={companyValuation}
              onChange={event => setCompanyValuation(event.target.value)}
            />
          </label>
          <label>
            Total Company's Shares
            <input
              value={totalCompanyShares}
              onChange={event => setTotalCompanyShares(event.target.value)}
            />
          </label>
          <label>
            Cliffing Date
            <input
              type="date"
              value={cliffDate}
              onChange={event => setCliffDate(event.target.value)}
            />
          </label>
          <br />
          <button type="submit" disabled={!formValid}>
            Create contract
          </button>
        </form>
      </Container>
    </div>
  );
};

export { CreateContract };

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

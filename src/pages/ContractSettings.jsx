import {
  Title,
  Tabs,
  Panels,
  Container,
  TabContainer,
  Formulary,
  Button
} from '../styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewContract } from '../store/contracts/thunks';
import { selectToken } from '../store/user/selectors';
import { selectAllEmployeeContractsSummary } from '../store/contracts/selectors';
import { selectAllEmployees } from '../store/employees/selectors';
import { ContractsList } from '../components';

const ContractSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const allEmployees = useSelector(selectAllEmployees);
  const allEmployeeContracts = useSelector(selectAllEmployeeContractsSummary);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = index => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : '';

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
      navigate('/login');
    }
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

  if (!allEmployeeContracts) {
    return (
      <Container>
        <Title> You don't have any Contracts!</Title>
      </Container>
    );
  }

  let contractsSummary = [];
  allEmployeeContracts.map(item =>
    contractsSummary.push(...item.employeeContractsSummary)
  );

  return (
    <Container>
      <TabContainer>
        <Tabs>
          <button
            className={`tab ${checkActive(0, 'active')}`}
            onClick={() => handleClick(0)}
          >
            Contracts List
          </button>
          <button
            className={`tab ${checkActive(1, 'active')}`}
            onClick={() => handleClick(1)}
          >
            Create new Contract
          </button>
        </Tabs>
        <Panels>
          <div className={`panel ${checkActive(0, 'active')}`}>
            <ContractsList allEmployeeContracts={contractsSummary} />
          </div>
          <div className={`panel ${checkActive(1, 'active')}`}>
            <Formulary
              style={{ display: 'flex', flexDirection: 'column' }} // in the future, I should change this style for styled components.
              onSubmit={submitForm}
            >
              <label>
                Employee
                <select
                  value={employeeId}
                  onChange={event => setEmployeeId(event.target.value)}
                >
                  <option value={''}>All Employees</option>
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
                Company Valuation
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
              <Button type="submit" disabled={!formValid}>
                Create contract
              </Button>
            </Formulary>
          </div>
        </Panels>
      </TabContainer>
    </Container>
  );
};

export { ContractSettings };

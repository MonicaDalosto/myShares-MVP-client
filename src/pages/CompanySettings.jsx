import styled from 'styled-components';
import { Container, Title } from '../styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../store/user/selectors';
import { selectCompany } from '../store/company/selectors';
import { updateCompanyData } from '../store/company/thunks';

const CompanySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const company = useSelector(selectCompany);

  const [name, setName] = useState('');
  const [currentValuation, setCurrentValuation] = useState('');
  const [totalCompanyShares, setTotalCompanyShares] = useState('');
  const [check, setCheck] = useState(false);

  const formValid =
    name && currentValuation && totalCompanyShares && check ? true : false;

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    if (company) {
      setName(company.name);
      setCurrentValuation(company.currentValuation);
      setTotalCompanyShares(company.totalCompanyShares);
    }
  }, [company, token, navigate]);

  const submitForm = event => {
    event.preventDefault();
    dispatch(
      updateCompanyData(
        name,
        Number(currentValuation),
        Number(totalCompanyShares)
      )
    );
  };

  return (
    <Container>
      <div>
        <Title>Update the Company's Data</Title>
        <form
          style={{ display: 'flex', flexDirection: 'column' }} // in the future, I should change this style for styled components.
          onSubmit={submitForm}
        >
          <label>
            Company's name
            <input
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </label>
          <label>
            Current Valuation:
            <input
              value={currentValuation}
              onChange={event => setCurrentValuation(event.target.value)}
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
            <input
              type="checkbox"
              value={check}
              onChange={event => setCheck(!check)}
            />{' '}
            I am aware that if I change the Company's valuation, all the
            Employees shares will be updated!
          </label>
          <br />
          <button type="submit" disabled={!formValid}>
            Submit update
          </button>
        </form>
      </div>
    </Container>
  );
};

export { CompanySettings };

import { Container, Title, Formulary, Button, TabContainer } from '../styled';
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

  const formValid = name && currentValuation && totalCompanyShares && check;

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
    setCheck(false);
  };

  return (
    <Container>
      <TabContainer forms>
        <Title>Update the Company's Valuation</Title>
        <Formulary onSubmit={submitForm}>
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
              checked={check}
              value={check}
              onChange={event => setCheck(!check)}
            />{' '}
            I am aware that if I change the valuation, all the Employees virtual
            shares will be updated!
          </label>
          <br />
          <Button type="submit" disabled={!formValid}>
            Submit update
          </Button>
        </Formulary>
      </TabContainer>
    </Container>
  );
};

export { CompanySettings };

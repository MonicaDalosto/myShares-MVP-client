import styled from 'styled-components';
import { Button } from '../styled';
import NumberFormat from 'react-number-format';

const ProjectionForm = ({
  submitForm,
  projectedValuation,
  setProjectedValuation,
  projectedDate,
  setProjectedDate,
  formValid,
  currentValuation
}) => {
  return (
    <FormContainer>
      <h2>
        Do you want to see the projection of your virtual shares? Fill the form
        below:
      </h2>
      <Form onSubmit={submitForm}>
        <label>
          Company valuation
          <input
            defaultValue={currentValuation}
            // value={projectedValuation}
            onChange={event => setProjectedValuation(event.target.value)}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={projectedDate}
            onChange={event => setProjectedDate(event.target.value)}
          />
        </label>
        <Button dashboard type="submit" disabled={!formValid}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export { ProjectionForm };

const FormContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 40px 20px;
  background-color: var(--color-white);
  border-radius: 5px;
  -webkit-box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  box-shadow: 0 0.75rem 1.5remrgba (18, 38, 63, 0.03);
  color: var(--color-title);

  h2 {
    font-size: 1.1rem;
    width: 730px;
    margin: 0 auto 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 1rem;

  input {
    width: 150px;
    padding: 10px;
    margin: auto 0 auto 10px;
    border: 1px solid var(--color-paragraph);
    border-radius: 5px;

    :focus {
      outline: var(--color-nav-hover);
    }

    ::placeholder {
      color: var(--color-paragraph);
    }
  }
`;

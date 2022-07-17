import styled from 'styled-components';
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
        <button type="submit" disabled={!formValid}>
          Submit
        </button>
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
    border: 2px solid var(--color-primary);
    border-radius: 4px;

    :focus {
      outline: 2px solid var(--color-nav-hover);
      border: 2px solid transparent;
    }
  }

  button {
    width: 150px;
    font-size: 1rem;
    padding: 10px;
    border-radius: 4px;
    border: 2px solid var(--color-primary);
    background-color: var(--color-primary);
    color: var(--color-white);

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      border: 2px solid var(--color-primary);
      background-color: var(--color-white);
      color: var(--color-primary);
    }
  }
`;

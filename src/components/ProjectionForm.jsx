const ProjectionForm = ({
  submitForm,
  projectedValuation,
  setProjectedValuation,
  projectedDate,
  setProjectedDate
}) => {
  return (
    <div>
      <form onSubmit={submitForm}>
        <p>
          Do you want to see the projection of your virtual shares? Fill the
          form below:
        </p>
        <label>
          Projected Company valuation
          <input
            value={projectedValuation}
            placeholder="1000000.00"
            onChange={event => setProjectedValuation(event.target.value)}
          />
        </label>
        <label>
          Projected Date
          <input
            type="date"
            value={projectedDate}
            onChange={event => setProjectedDate(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { ProjectionForm };

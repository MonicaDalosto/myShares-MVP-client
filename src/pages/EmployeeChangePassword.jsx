import { Container, Title, Formulary, Button, TabContainer } from '../styled';

const EmployeeChangePassword = () => {
  return (
    <Container>
      <TabContainer>
        <Title>Change your Password</Title>
        <Formulary
        // onSubmit={submitForm}
        >
          <label>
            Name
            <input
              // value={name}
              disabled={true}
            />
          </label>
          <label>
            Email
            <input
              // value={currentValuation}
              disabled={true}
            />
          </label>
          <label>
            Department
            <input
              // value={totalCompanyShares}
              disabled={true}
            />
          </label>
          <label>
            Current Password
            <input
              type="password"
              // value={totalCompanyShares}
              // onChange={event => setTotalCompanyShares(event.target.value)}
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              // value={totalCompanyShares}
              // onChange={event => setTotalCompanyShares(event.target.value)}
            />
          </label>
          <label>
            Confirm new Password
            <input
              type="password"
              // value={totalCompanyShares}
              // onChange={event => setTotalCompanyShares(event.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              // value={check}
              // onChange={event => setCheck(!check)}
            />{' '}
            I want to change my password!
          </label>
          <br />
          <Button
          // type="submit" disabled={!formValid}
          >
            Submit
          </Button>
        </Formulary>
      </TabContainer>
    </Container>
  );
};

export { EmployeeChangePassword };

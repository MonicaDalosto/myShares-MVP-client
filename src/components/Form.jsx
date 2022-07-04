import { Component } from 'react';
import { FormErrors } from './FormErrors';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '',
      signatureDate: '',
      companyValuation: '',
      companyShares: '',
      grantedShares: '',
      cliffingDate: '',
      formErrors: {
        employeeId: '',
        signatureDate: '',
        companyValuation: '',
        companyShares: '',
        grantedShares: '',
        cliffingDate: ''
      },
      employeeIdValid: false,
      signatureDateValid: false,
      companyValuationValid: false,
      companySharesValid: false,
      grantedSharesValid: false,
      cliffingDateValid: false,
      formValid: false
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let employeeIdValid = this.state.employeeIdValid;
    let signatureDateValid = this.state.signatureDateValid;
    let companyValuationValid = this.state.companyValuationValid;
    let companySharesValid = this.state.companySharesValid;
    let grantedSharesValid = this.state.grantedSharesValid;
    let cliffingDateValid = this.state.cliffingDateValid;

    switch (fieldName) {
      case 'employeeId':
        employeeIdValid = value !== null;
        fieldValidationErrors.employeeId = employeeIdValid ? '' : ' is invalid';
        break;
      case 'signatureDate':
        signatureDateValid = value !== null;
        fieldValidationErrors.signatureDate = signatureDateValid
          ? ''
          : ' is invalid';
        break;
      case 'companyValuation':
        companyValuationValid = value !== null;
        fieldValidationErrors.companyValuation = companyValuationValid
          ? ''
          : ' is invalid';
        break;
      case 'companyShares':
        companySharesValid = value !== null;
        fieldValidationErrors.companyShares = companySharesValid
          ? ''
          : ' is invalid';
        break;
      case 'grantedShares':
        grantedSharesValid = value !== null;
        fieldValidationErrors.grantedShares = grantedSharesValid
          ? ''
          : ' is invalid';
        break;
      case 'cliffingDate':
        cliffingDateValid = value !== null;
        fieldValidationErrors.cliffingDate = cliffingDateValid
          ? ''
          : ' is invalid';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        employeeIdValid: employeeIdValid,
        signatureDateValid: signatureDateValid,
        companyValuationValid: companyValuationValid,
        companySharesValid: companySharesValid,
        grantedSharesValid: grantedSharesValid,
        cliffingDateValid: cliffingDateValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.employeeIdValid &&
        this.state.signatureDateValid &&
        this.state.companyValuationValid &&
        this.state.companySharesValid &&
        this.state.grantedSharesValid &&
        this.state.cliffingDateValid
    });
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  render() {
    return (
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Create new contract</h2>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <label>
          Employee
          <select
            name="employee"
            value={this.state.employeeId}
            onChange={event => this.handleUserInput(event)}
          >
            <option>No employees</option>
            {/* {!allEmployees ? (
              <option>You don't have employees</option>
            ) : (
              allEmployees.map(employee => (
                <option value={employee.employee.id}>{employee.name}</option>
              ))
            )} */}
          </select>
        </label>
        <label>
          Signature Date
          <input
            name="signatureDate"
            value={this.state.signatureDate}
            onChange={event => this.handleUserInput(event)}
          />
        </label>
        <label>
          Granted Shares
          <input
            name="grantedShares"
            value={this.state.grantedShares}
            onChange={event => this.handleUserInput(event)}
          />
        </label>
        <label>
          Company Valuation:
          <input
            name="companyValuation"
            value={this.state.companyValuation}
            onChange={event => this.handleUserInput(event)}
          />
        </label>
        <label>
          Total Company's Shares
          <input
            name="companyShares"
            value={this.state.companyShares}
            onChange={event => this.handleUserInput(event)}
          />
        </label>
        <label>
          Cliffing Date
          <input
            type="date"
            name="cliffingDate"
            value={this.state.cliffingDate}
            onChange={event => this.handleUserInput(event)}
          />
        </label>

        <button type="submit" disabled={!this.state.formValid}>
          Submit contract
        </button>
      </form>
    );
  }
}
export default Form;

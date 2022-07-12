export const selectAllEmployees = reduxState =>
  reduxState.employees.allEmployees;

export const selectSpecificEmployee = id => reduxState =>
  reduxState.employees.allEmployees &&
  reduxState.employees.allEmployees.find(e => e.id === id);

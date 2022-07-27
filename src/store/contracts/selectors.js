import moment from 'moment';

export const selectMyContractsSummary = reduxState =>
  reduxState.contracts.myContractsSummary;

export const selectMySharesProjection = reduxState =>
  reduxState.contracts.mySharesProjection;

export const selectEmployeeContractsSummary = reduxState =>
  reduxState.contracts.employeeContractsSummary;

export const selectEmployeeSharesProjection = reduxState =>
  reduxState.contracts.employeeSharesProjection;

export const selectAllEmployeeContractsSummary = reduxState =>
  reduxState.contracts.allEmployeeContractsSummary;

export const selectTheTotalOfCompanyShares = reduxState => {
  if (reduxState.contracts.allEmployeeContractsSummary) {
    const employeeTotal = reduxState.contracts.allEmployeeContractsSummary.map(
      employee => employee.totalOfEmployeeShares
    );

    const totalOfVirtualGrantedShares = employeeTotal.reduce(
      (accumulator, contract) =>
        accumulator + contract.totalOfVirtualGrantedShares,
      0
    );
    const totalOfVirtualOwnedShares = employeeTotal.reduce(
      (accumulator, contract) =>
        accumulator + contract.totalOfVirtualOwnedShares,
      0
    );
    const totalOfSharesValueBasedCompanyCurrentValuation = employeeTotal.reduce(
      (accumulator, contract) =>
        accumulator + contract.totalOfSharesValueBasedCompanyCurrentValuation,
      0
    );

    return {
      totalOfVirtualGrantedShares,
      totalOfVirtualOwnedShares,
      totalOfSharesValueBasedCompanyCurrentValuation
    };
  }
};

export const selectTheTotalPerYearOfCompanyShares = reduxState => {
  if (reduxState.contracts.allEmployeeContractsSummary) {
    const contractsSummary = [];
    reduxState.contracts.allEmployeeContractsSummary.map(item =>
      contractsSummary.push(...item.employeeContractsSummary)
    );
    const years = [];
    contractsSummary.map(contract => {
      if (!years.includes(moment(contract.signatureDate).year())) {
        years.push(moment(contract.signatureDate).year());
      }
      return years;
    });

    const totalOfContractsPerYear = years.map(year => {
      const contractsFiltered = contractsSummary.filter(
        contract => year === moment(contract.signatureDate).year()
      );
      const grantedShares = contractsFiltered.reduce(
        (accumulator, contract) => accumulator + contract.grantedShares,
        0
      );
      const ownedShares = contractsFiltered.reduce(
        (accumulator, contract) => accumulator + contract.virtualOwnedShares,
        0
      );
      return {
        signatureDate: year,
        grantedShares: Math.round(grantedShares * 100) / 100,
        ownedShares: Math.round(ownedShares * 100) / 100
      };
    });
    return totalOfContractsPerYear;
  }
};

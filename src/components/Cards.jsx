import NumberFormat from 'react-number-format';
import { CardContainer, CardBox } from '../styled';

const Cards = ({ totalContracts }) => {
  return (
    <CardContainer>
      <CardBox>
        <h2>
          <NumberFormat
            value={totalContracts.totalOfVirtualGrantedShares}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        </h2>
        <p>Granted Shares</p>
      </CardBox>
      <CardBox>
        <h2>
          <NumberFormat
            value={totalContracts.totalOfVirtualOwnedShares}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        </h2>
        <p>Owned Shares</p>
      </CardBox>
      <CardBox>
        <h2>
          <NumberFormat
            value={
              totalContracts.totalOfSharesValueBasedCompanyCurrentValuation
            }
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        </h2>
        <p>Virtual Value</p>
      </CardBox>
    </CardContainer>
  );
};

export { Cards };

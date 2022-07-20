import { ChartContainer } from '../styled';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

const BarChartShares = ({ data }) => {
  return (
    <ChartContainer>
      <h2>Granted Shares X Owned Shares</h2>
      <BarChart
        style={{
          margin: 'auto',
          color: 'var(--color-paragraph)'
        }}
        width={730}
        height={250}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="signatureDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="grantedShares" fill="var(--color-chart-1" />
        <Bar dataKey="ownedShares" fill="var(--color-chart-2" />
      </BarChart>
    </ChartContainer>
  );
};

export { BarChartShares };

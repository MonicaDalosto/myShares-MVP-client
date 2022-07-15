import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { ChartContainer } from '../styled';

const BarChartShares = ({ data }) => {
  return (
    <ChartContainer>
      <BarChart style={{ margin: 'auto' }} width={800} height={300} data={data}>
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

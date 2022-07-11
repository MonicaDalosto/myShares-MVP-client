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
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="signatureDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="grantedShares" fill="#ee6a50" />
        <Bar dataKey="ownedShares" fill="#191a62" />
      </BarChart>
    </div>
  );
};

export { BarChartShares };

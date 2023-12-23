import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartComponent = ({ analytics }) => {
  return (
    <div className="container">
      <LineChart width={600} height={300} data={analytics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ctr" stroke="#8884d8" dot={{ stroke: 'red', strokeWidth: 2 }} />
      </LineChart>
      <LineChart width={600} height={300} data={analytics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="conversation_rate" stroke="#8884d8" dot={{ stroke: 'red', strokeWidth: 2 }} />
      </LineChart>
      <LineChart width={600} height={300} data={analytics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="roi" stroke="#8884d8" dot={{ stroke: 'red', strokeWidth: 2 }} />
      </LineChart>
      <LineChart width={600} height={300} data={analytics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cac" stroke="#8884d8" dot={{ stroke: 'red', strokeWidth: 2 }} />
      </LineChart>
      <LineChart width={600} height={300} data={analytics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ltv" stroke="#8884d8" dot={{ stroke: 'red', strokeWidth: 2 }} />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;

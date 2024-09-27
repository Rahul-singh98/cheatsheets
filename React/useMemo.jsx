import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw } from "lucide-react";

const ExpensiveComponent = ({ data }) => {
  console.log("Rendering ExpensiveComponent");

  const chartData = useMemo(() => {
    console.log("Calculating chart data");
    return data.map((value, index) => ({ x: index, y: value }));
  }, [data]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Data Visualization</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const UseMemoExample = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const generateData = () => {
    console.log("Generating new data");
    const newData = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * 100)
    );
    setData(newData);
  };

  const expensiveCalculation = (num) => {
    console.log("Calculating expensive result");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    return result;
  };

  const memoizedResult = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">useMemo Example</h1>

      <div className="mb-4">
        <button
          onClick={generateData}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <RefreshCw className="mr-2" /> Generate New Data
        </button>
      </div>

      <ExpensiveComponent data={data} />

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Expensive Calculation</h2>
        <p>Count: {count}</p>
        <p>Expensive Result: {memoizedResult}</p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Increment Count
        </button>
      </div>
    </div>
  );
};

export default UseMemoExample;

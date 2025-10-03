'use client';

import { motion } from 'framer-motion';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { fadeIn } from '../utils/motion';

const RoastProfileChart = ({ roastData }) => {
  if (!roastData || roastData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <p className="text-white">No roast profile data available</p>
      </div>
    );
  }

  // Transform the data for the chart
  const chartData = roastData.map((point, index) => ({
    time: point.time || index,
    bt: point.bt || point.bean_temperature || 0,
    et: point.et || point.environment_temperature || 0,
    ror: point.ror || 0,
    fire: point.fire || 0,
    airflow: point.airflow || 0,
  }));

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="w-full h-80"
    >
      <h3 className="text-white text-lg font-semibold mb-4">Roast Profile</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#FFFFFF" // Set XAxis line to white
            tick={{ fill: '#FFFFFF' }} // Set XAxis ticks to white
          />
          {/* Primary Y-axis for BT and ET temperatures */}
          <YAxis
            yAxisId="temp"
            stroke="#FFFFFF" // Set YAxis line to white
            tick={{ fill: '#FFFFFF' }} // Set YAxis ticks to white
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} // Set YAxis label to white
          />
          {/* Secondary Y-axis for ROR */}
          <YAxis
            yAxisId="ror"
            orientation="right"
            stroke="#FFFFFF" // Set YAxis line to white
            tick={{ fill: '#FFFFFF' }} // Set YAxis ticks to white
            label={{ value: 'ROR (°C/min)', angle: 90, position: 'insideRight', fill: '#FFFFFF' }} // Set YAxis label to white
          />
          {/* Third Y-axis for Fire and Airflow */}
          <YAxis
            yAxisId="controls"
            orientation="right"
            stroke="#FFFFFF" // Set YAxis line to white
            tick={{ fill: '#FFFFFF' }} // Set YAxis ticks to white
            label={{ value: 'Fire/Airflow (%)', angle: 90, position: 'insideRight', fill: '#FFFFFF' }} // Set YAxis label to white
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#FFFFFF', // Set Tooltip content text to white
            }}
            labelStyle={{ color: '#FFFFFF' }} // Set Tooltip label text to white
          />
          {/* Temperature lines */}
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="bt"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Bean Temperature (BT)"
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="et"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            name="Environment Temperature (ET)"
          />
          {/* ROR line */}
          <Line
            yAxisId="ror"
            type="monotone"
            dataKey="ror"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Rate of Rise (ROR)"
          />
          {/* Fire and Airflow bars */}
          <Line
            yAxisId="controls"
            dataKey={(data) => data.fire * 100} // Scale 0-1 data to 0-100 for the axis
            fill="#F59E0B"
            name="Fire (%)"
            opacity={1}
          />
          <Line
            yAxisId="controls"
            dataKey={(data) => data.airflow * 100} // Scale 0-1 data to 0-100 for the axis
            fill="#EF4444"
            name="Airflow (%)"
            opacity={1}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default RoastProfileChart;

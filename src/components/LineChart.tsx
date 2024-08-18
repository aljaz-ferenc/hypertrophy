import React from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Measurement, WeightUnits } from '@/types';

type WeightData = {
  date: Date;
  weight: number;
};

type LineChartProps = {
  data: Measurement<WeightUnits>[];
};

function LineChart({ data }: LineChartProps) {
   if(!data.length){
    return (
      <>no data</>
    )
   }

  const transformedData = data.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    value: item.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Chart
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChart;

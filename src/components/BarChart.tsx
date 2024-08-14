import { format } from 'date-fns';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

type BarChartComponentProps = {
  data?: {
    _id: any,
    date: string | Date,
    nutrition: {
      calories: number,
      carbs: number,
      fat: number,
      protein: number
    }
  }[],
  className: string
}

const BarChartComponent = ({
  data = [] ,
  className
}: BarChartComponentProps) => {
  const transformedData = data.map(item => {
    const date = typeof item.date === 'string' ? new Date(item.date) : item.date;
    const { calories, carbs, fat, protein } = item.nutrition;
    
    const totalNutrients = carbs + fat + protein;
    
    const carbsHeight = totalNutrients ? (carbs / totalNutrients) * calories : 0;
    const fatHeight = totalNutrients ? (fat / totalNutrients) * calories : 0;
    const proteinHeight = totalNutrients ? (protein / totalNutrients) * calories : 0;

    return {
      date: format(date, 'EEE'),
      carbs: carbsHeight,
      fat: fatHeight,
      protein: proteinHeight
    };
  });

  return (
    <BarChart width={600} height={300} data={transformedData} className={className}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis>
        <Label
          value="Calories"
          angle={-90}
          position="left"
          style={{ textAnchor: 'middle' }}
        />
      </YAxis>
      <Tooltip />
      <Legend />
      <Bar dataKey="protein" stackId="a" fill="#d84d7f" />
      <Bar dataKey="fat" stackId="a" fill="#ffc658" />
      <Bar dataKey="carbs" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}

export default BarChartComponent;

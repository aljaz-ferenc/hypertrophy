import { useScreenSize } from '@/lib/hooks';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine } from 'recharts';

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
  bmr: number,
  className: string
  width: number
}

const BarChartComponent = ({
  data = [] ,
  className,
  width,
  bmr
}: BarChartComponentProps) => {
  // const {width, height} = useScreenSize()

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

  const maxDataValue = useMemo(() => {
    return  Math.max(...data.map(d => d.nutrition.calories)) ;
  }, [data])

  return (
    <BarChart width={width} height={width / 2} data={transformedData} className={className}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, Math.max(bmr, maxDataValue) + 300]}>
        <Label
          value="Calories"
          angle={-90}
          position="left"
          style={{ textAnchor: 'middle' }}
        />
      </YAxis>
      <Tooltip />
      <Legend/>
      <Bar dataKey="protein" stackId="a" fill="#d84d7f" />
      <Bar dataKey="fat" stackId="a" fill="#ffc658" />
      <Bar dataKey="carbs" stackId="a" fill="#82ca9d" />
      <ReferenceLine y={bmr} stroke='yellow' strokeDasharray="10 3"/>
    </BarChart>
  );
}

export default BarChartComponent;

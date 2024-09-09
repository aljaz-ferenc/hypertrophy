import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine } from "recharts";
import { format } from 'date-fns';
import { foodItems } from "@/data";

type BarChartComponentProps = {
  data?: {
    _id: any,
    date: string | Date,
    amount: number,
    itemId: string,
  }[],
  bmr: number,
  className: string,
  width: number
};

const BarChartComponent = ({ data = [], className, width, bmr }: BarChartComponentProps) => {
  
  const transformedData = useMemo(() => {
    const dailyNutrition = data.reduce((acc: any, curr) => {
      const itemData = foodItems.find(i => i.id === curr.itemId);
      if (!itemData) return acc;

      const date = format(new Date(curr.date), 'EEE');
      const calories = (curr.amount / 100) * itemData.calories;
      const protein = (curr.amount / 100) * itemData.protein;
      const fat = (curr.amount / 100) * itemData.fat;
      const carbs = (curr.amount / 100) * itemData.carbs;

      if (!acc[date]) {
        acc[date] = { date, calories: 0, protein: 0, fat: 0, carbs: 0 };
      }

      acc[date].calories += calories;
      acc[date].protein += protein;
      acc[date].fat += fat;
      acc[date].carbs += carbs;

      return acc;
    }, {});

    // Transform object to array
    return Object.values(dailyNutrition).map((day: any) => {
      const totalNutrients = day.protein + day.fat + day.carbs;

      return {
        date: day.date,
        calories: day.calories,
        protein: totalNutrients ? (day.protein / totalNutrients) * day.calories : 0,
        fat: totalNutrients ? (day.fat / totalNutrients) * day.calories : 0,
        carbs: totalNutrients ? (day.carbs / totalNutrients) * day.calories : 0,
      };
    });
  }, [data]);

  const maxDataValue = useMemo(() => {
    return Math.max(...transformedData.map(d => d.calories), 0);
  }, [transformedData]);

  return (
    <BarChart width={width} height={width / 2} data={transformedData} className={className}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis
  domain={[0, bmr + 300]} // Always extend the Y-axis to at least 300 calories above the BMR
  tickFormatter={(value) => value.toLocaleString()} // Formats the Y-axis labels for readability
>
  <Label value="Calories" angle={-90} position="left" style={{ textAnchor: 'middle' }} />
</YAxis>


      <Tooltip />
      <Legend />
      <Bar dataKey="protein" stackId="a" fill="#d84d7f" />
      <Bar dataKey="fat" stackId="a" fill="#ffc658" />
      <Bar dataKey="carbs" stackId="a" fill="#82ca9d" />
      <ReferenceLine y={bmr} stroke="yellow" strokeDasharray="10 3" />
    </BarChart>
  );
};

export default BarChartComponent;

import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


type PieChartComponentProps = {
    protein: number,
    carbs: number,
    fat: number
}

const COLORS = ['#d84d7f', '#82ca9d', '#ffc658'];


export default function PieChartComponent({protein, carbs, fat}: PieChartComponentProps){

    const data = useMemo(() => {
        return [
            { name: 'Protein', value: protein },
            { name: 'Carbs', value: carbs },
            { name: 'Fat', value: fat },
        ]
      }, [protein, carbs, fat])

    return (
        <PieChart width={400} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    )
}
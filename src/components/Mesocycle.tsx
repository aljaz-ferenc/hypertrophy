import React from 'react'
import WorkoutDayForm from './WorkoutDayForm';
import { Workout } from '@/types';

type MesocycleProps = {
    workouts: Workout[]
}

export default function Mesocycle({workouts}: MesocycleProps) {

  return (
    <div className="flex gap-3 pb-3">
    {workouts.map((workout) => (
        <WorkoutDayForm
        workout={workout}
        key={workout.id}
        workouts={workouts}
        />
        ))}
    </div>
  )
}

import React from 'react'
import WorkoutDayForm from './WorkoutDayForm';
import { Workout } from '@/types';

type MesocycleProps = {
    workouts: Workout[]
    editable?: boolean
}

export default function Mesocycle({workouts, editable = false}: MesocycleProps) {

  return (
    <div className="flex gap-3 pb-3  w-full overflow-auto custom-scrollbar">
    {workouts.map((workout) => (
        <WorkoutDayForm
        editable = {editable}
        workout={workout}
        key={workout.id}
        workouts={workouts}
        />
        ))}
    </div>
  )
}

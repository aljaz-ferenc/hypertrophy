'use client'

import { Days, Mesocycle, Workout } from '@/types'
import { useAuth } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import * as actions from '@/actions'
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { differenceInCalendarISOWeeks, getDay } from 'date-fns'
import Exercise from '@/components/Exercise'

function todaysWorkout(mesocycle: Mesocycle){
  const today = getDay(new Date()) + 1
  const todaysWorkout = mesocycle.workouts.find(workout => workout.weekDay === today)
 
  return todaysWorkout
}
export default function TodaysWorkoutPage() {
  const {userId} = useAuth()
  const [mesocycle, setMesocycle] = useState<Mesocycle | null | undefined>(undefined)
  const [workout, setWorkout] = useState<Workout>()
  const [isFetching, setIsFetching] = useState(true)
  
  
  useEffect(() => {
    if(!userId) return
    actions.getActiveMesocycle(userId)
      .then(meso => {
        console.log(meso)
        setMesocycle(meso)
        setWorkout(todaysWorkout(meso))
      })
      .finally(() => setIsFetching(false))
  }, [userId])

  if(isFetching){
    return <p>Loading...</p>
  }

  if(!isFetching && mesocycle === null){
    return <p>Currently you have no active mesocycles. <Link href='/app/my-mesocycles' className='text-blue-600 underline'>Activate and existing one</Link> or <Link href='/app/create-mesocycle' className='text-blue-600 underline'>create a new one.</Link></p>
  }

  if(!mesocycle) return

  const week = differenceInCalendarISOWeeks(new Date(), new Date(mesocycle.startDate!))

  return (
    <div className='max-w-[1440px] w-full mx-auto p-3 flex flex-col gap-3'>
      <div className='bg-muted p-3'>
        <p className='text-md text-gray-400 font-semibold uppercase'>{mesocycle.title}</p>
        <h2 className='text-2xl font-bold uppercase'>
        Week <span className='text-3xl'>{week + 1}</span> - {Days[getDay(new Date()) + 1]}
        </h2>
      </div>
      {workout?.exercises.map(exercise => (
        <Exercise exercise={exercise} key={exercise.id}/>
      ))}
    </div>
  )
}

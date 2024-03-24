"use client";

import { Exercise, MuscleGroup, Weekday, Workout } from "@/types";
import { createContext, useContext, useReducer } from "react";

type MesocycleContextType = {
  workouts: Workout[];
  addWorkout: () => void;
  setWeekDay: (weekDay: number, workoutId: string) => void;
  deleteWorkout: (workoutId: string) => void;
  addExercise: (muscleGroup: MuscleGroup, workoutId: string) => void;
  deleteExercise: (exerciseId: string, workoutId: string) => void;
  updateExercise: (
    workoutId: string,
    exerciseId: string,
    exercise: string
  ) => void;
  reorderExercises: (workoutId: string, exercises: Exercise[]) => void
  resetWorkouts: () => void
};

type  MesocycleContextProviderProps = {
  children: React.ReactNode;
};

type WorkoutReducerState = Workout[];

type WorkoutReducerAction = {
  type: string;
  payload?: any;
};

export const  MesocycleContext = createContext<MesocycleContextType | null>(null);

const initialState: Workout[] = [
  {
    id: crypto.randomUUID(),
    weekDay: 0,
    exercises:[]
  }
];

function workoutsReducer(
  state: WorkoutReducerState,
  action: WorkoutReducerAction
) {
  switch (action.type) {
    case "workout/add": {
      const newWorkout = { ...action.payload, id: crypto.randomUUID(), exercises: [] };
      return [...state, newWorkout];
    }

    case "day/add": {
      const { workoutId, day } = action.payload;

      return state.map(workout => {
        if(workout.id === workoutId){
          return {...workout, weekDay: day}
        }
        return workout
      })
    }

    case "workout/delete": {
      const { workoutId } = action.payload;
      return state.filter((workout) => workout.id !== workoutId);
    }

    case "exercise/add": {
      const { workoutId, muscleGroup } = action.payload;

      return state.map((workout) => {
        if (workout.id === workoutId) {
          const updatedWorkout = {
            ...workout,
            exercises: workout.exercises
              ? [
                  ...workout.exercises,
                  { muscleGroup, exercise: "", id: crypto.randomUUID() },
                ]
              : [{ muscleGroup, exercise: "", id: crypto.randomUUID() }],
          };
          return updatedWorkout;
        }
        return workout;
      });
    }

    case "exercise/delete": {
      const { workoutId, exerciseId } = action.payload;

      const newWorkouts = state.map((workout) => {
        if (workout.id === workoutId) {
          const updatedExercises = workout.exercises.filter(
            (ex) => ex.id !== exerciseId
          );

          return {
            ...workout,
            exercises: updatedExercises,
          };
        }
        return workout;
      });

      return newWorkouts;
    }
    case "exercise/update": {
      const { workoutId, exerciseId, exercise } = action.payload;

      const newWorkouts = state.map((workout) => {
        if (workout.id === workoutId) {
          const updatedExercises = workout.exercises.map((ex) => {
            if (ex.id === exerciseId) {
              return {
                ...ex,
                exercise,
              };
            }
            return ex;
          });

          return {
            ...workout,
            exercises: updatedExercises,
          };
        }
        return workout;
      });

      return newWorkouts;
    }
    case 'exercises/reorder':{
      const {workoutId, exercises} = action.payload
      return state.map(workout => {
        if(workout.id === workoutId){
          return {...workout, exercises: exercises}
        }
        return workout
      })
    }
    case 'workouts/reset': {
      state = initialState
    }
    default:
      return state;
  }
}

export default function  MesocycleContextProvider({
  children,
}:  MesocycleContextProviderProps) {
  const [workouts, dispatch] = useReducer(workoutsReducer, initialState);

  function addWorkout() {
    dispatch({ type: "workout/add" });
  }

  function setWeekDay(day: number, workoutId: string) {
    dispatch({ type: "day/add", payload: { day, workoutId } });
  }

  function deleteWorkout(workoutId: string) {
    dispatch({ type: "workout/delete", payload: { workoutId } });
  }

  function addExercise(muscleGroup: MuscleGroup, workoutId: string) {
    dispatch({ type: "exercise/add", payload: { muscleGroup, workoutId } });
  }

  function deleteExercise(exerciseId: string, workoutId: string) {
    dispatch({ type: "exercise/delete", payload: { exerciseId, workoutId } });
  }

  function updateExercise(
    workoutId: string,
    exerciseId: string,
    exercise: string
  ) {
    dispatch({
      type: "exercise/update",
      payload: { workoutId, exerciseId, exercise },
    });
  }

  function reorderExercises(workoutId: string, exercises: Exercise[]){
    dispatch({type: 'exercises/reorder', payload: {exercises, workoutId}})
  }

  function resetWorkouts(){
    dispatch({type: 'workouts/reset'})
  }

  return (
    <MesocycleContext.Provider
      value={{
        workouts,
        addWorkout,
        setWeekDay,
        deleteWorkout,
        addExercise,
        deleteExercise,
        updateExercise,
        reorderExercises,
        resetWorkouts
      }}
    >
      {children}
    </MesocycleContext.Provider>
  );
}

export function useMesocycleContext() {
  const context = useContext(MesocycleContext);
  return context;
}

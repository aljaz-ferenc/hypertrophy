"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Exercise, Log, Mesocycle, Workout, LogExercise } from "@/types";

type LogContextType = {
  setupLogState: (log: Log) => void;
  addExerciseLog: (exerciseData: LogExercise) => void;
  exercises: LogExercise[]
  setupExerciseState: (exercises: LogExercise[]) => void
  addSetToExercise: (exerciseId: string) => void
  removeSet: (exerciseId: string, setIndex: number) => void
  updateSetData: (exerciseId: string, setIndex: number, data: {reps: string, weight: string}) => void
  log: Log
};

const LogContext = createContext<LogContextType | null>(null);

const logInitialState: Log = {
  mesoTitle: "",
  mesoId: "", // You need to initialize properties
  duration: 0,
  weeks: [],
};

const exerciseInitialState: LogExercise[] = [] as LogExercise[];

type LogContextProviderProps = {
  children: React.ReactNode;
};

type LogReducerState = Log;

type LogReducerAction = {
  type: string;
  payload?: any; // Adjust payload type to match dispatched actions
};

type ExerciseReducerAction = LogReducerAction;

type ExerciseReducerState = LogExercise[];

function logReducer(state: LogReducerState, action: LogReducerAction) {
  switch (action.type) {
    case "log/setup": {
        const {log} = action.payload
      return log
    }
    default:
      return state;
  }
}

function exerciseReducer(
  state: ExerciseReducerState,
  action: ExerciseReducerAction
) {
  switch (action.type) {
    case 'exercises/setup': {
        const {exercises} = action.payload
        return exercises
    }

    case "exercise/add": {
        const exercise = action.payload;

      if (state.some((ex) => ex.id === exercise.id)) {
        return state.map((ex) => {
          if (ex.id === exercise.id) {
            return { ...ex, data: [...ex.data, ...exercise.data] };
          }else{
            return {...ex}
          }
        });
      } else {
        return [...state, exercise];
      }
    }
    case 'set/add': {
        const {exerciseId} = action.payload

        return state.map(ex => {
            if(ex.id === exerciseId){
                return {...ex, data: [...ex.data, {reps:0, weight: 0}]}
            }
            return ex
        })
    }
    case 'set/remove': {
        const {exerciseId, setIndex} = action.payload

        return state.map(ex => {
            if(ex.id === exerciseId){
                const data = ex.data.filter((set, i) => i !== setIndex)
                return {...ex, data}
            }
            return ex
        })
    }
    case 'set/update': {
        const { exerciseId, setIndex, data } = action.payload;
  
        return state.map(ex => {
          if (ex.id === exerciseId) {
            return {
              ...ex,
              data: ex.data.map((d, i) => {
                if (i === setIndex) {
                  return {...data }; // Merge existing data with updated data
                }
                return d;
              })
            };
          }
          return ex;
        });
      }
    default:
      return state;
  }

}

export default function LogContextProvider({
  children,
}: LogContextProviderProps) {
  const [log, dispatchLog] = useReducer(logReducer, logInitialState);
  const [exercises, dispatchExercise] = useReducer(
    exerciseReducer,
    exerciseInitialState
  );

  function setupLogState(log: Log) {
    dispatchLog({ type: "log/setup", payload: { log } }); // Pass mesocycle within an object
  }

  function setupExerciseState(exercises: LogExercise[]) {
    dispatchExercise({ type: "exercises/setup", payload: { exercises } });
  }

  function addExerciseLog(exerciseData: LogExercise) {
    dispatchExercise({ type: "exercise/add", payload: exerciseData });
  }

  function addSetToExercise(exerciseId: string){
    dispatchExercise({type: 'set/add', payload: {exerciseId}})
  }

  function removeSet(exerciseId: string, setIndex: number){
    dispatchExercise({type: 'set/remove', payload: {exerciseId, setIndex}})
  }

  function updateSetData(exerciseId: string, setIndex: number, data: {reps: string, weight: string}){
    dispatchExercise({type: 'set/update', payload: {data, exerciseId, setIndex}})
  }

  return (
    <LogContext.Provider value={{ setupLogState, addExerciseLog, exercises, updateSetData, setupExerciseState, addSetToExercise,removeSet, log }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogContext() {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogContext must be used within a LogContextProvider");
  }
  return context;
}

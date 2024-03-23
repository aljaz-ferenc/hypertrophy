export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type MuscleGroup =
  | "biceps"
  | "triceps"
  | "chest"
  | "back"
  | "shoulders"
  | "quads"
  | "glutes"
  | "hamstrings"
  | "abs"
  | "traps"
  | "forearms"
  | "calves";

  export type Units = 'kg' | 'lb'

export type Exercise = {
  muscleGroup: MuscleGroup;
  exercise: string;
  id: string
};

export type Workout = {
  weekDay: number
  exercises: Exercise[];
  id: string;
};

export type Mesocycle = {
  _id?: string
  isActive?: boolean
  startDate?: Date
  title: string,
  duration: number,
  units: Units,
  workouts: Workout[]
}

export enum Days {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
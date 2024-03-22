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


export type Exercise = {
  muscleGroup: MuscleGroup;
  exercise: string;
  id: string
};

export type Workout = {
  weekDay: Weekday
  exercises: Exercise[];
  id: string;
};


export type Mesocycle = {
  name: string,
  id: string,
  duration: number,
  units: 'kg' | 'lb',
  workouts: Workout[]
}
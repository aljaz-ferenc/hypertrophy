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
  | "calves"
  | "neck"


// export type Exercise = {
//   muscleGroup: MuscleGroup;
//   name: string;
//   id: string
// };
export type Exercise = any

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
  user?: string
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

export type Set = {
  weight: number,
  reps: number,
  logged?: boolean
}


export type RestTip = {
  title: string,
  description: string
}

export type Log = {
  _id?: string;
  mesoTitle: string;
  mesoId: string;
  duration: number;
  user?: string
  weeks: {
    workouts: {
      exercises: {
        day: number
        exercise: string;
        data: {
          reps: string;
          weight: string;
        }[];
      }[];
    }[];
  }[];
};


export type LogExercise = {
  exercise: string;
  id?: string,
        data: {
          reps: number;
          weight: number;
        }[];
}

export type WorkoutLog = {
  day: number,
  exercises: {
    exercise: string,
    data:{
      reps: number,
      weight: number
    }[]
  }[]
}

export type User = {
  _id?: string,
  clerkId?: string
  email: string,
  username?: string,
  firstName?: string,
  lastName?: string
  image: string,
  lastWorkout?: Date
}

export type FoodItem = {
  name: string,
  protein: number,
  fat: number,
  carbs: number
  calories: number,
  id: string
}

export type Nutrition = {
  amount: number,
  itemId: string, 
  date: Date,
  user: string
  item: string
}

export type UserNutrition = {
  userId: string,
  date: Date,
  nutrition: Nutrition
}

export type HeightUnits = 'cm' | 'in'
export type WeightUnits = 'kg' | 'lb'
export type Units = HeightUnits | WeightUnits

export type Measurement<T> = {
  value: number,
  date: Date,
  units: T
}

export type BodyPart = 'neck' | 'rightBicep' | 'leftBicep' | 'rightForearm' | 'leftForearm' | 'chest' | 'rightThigh' | 'leftThigh' | 'rightCalf' | 'leftCalf'

export type BodyPartData = {name: BodyPart, data: {value: number, date: Date}}

export type Stats = {
  height: Omit<Measurement<HeightUnits>, 'date'>,
  weight:  Measurement<WeightUnits>[],
  dob: Date,
  measurements: {
    [key in BodyPart]: Measurement<HeightUnits>
  },
  bmr: number
}

export type Gender = 'male' | 'female'

export type Portion = {
  title: string,
  amount: string,
  id: string
}

export type FoodItem1 = {
  name: string,
  calories: number,
  protein: number,
  fat: number,
  carbs: number,
  user: string,
  portions: Portion[]
}
import { Exercise, MuscleGroup, Weekday } from "./types";

export const exercises = [
  {
    muscleGroup: "biceps",
    exercise: "Chin Ups"
  },
  {
    muscleGroup: "biceps",
    exercise: "Barbell Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Dumbbell Hammer Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Preacher Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Cable Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Incline Dumbbell Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Concentration Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "EZ Bar Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Reverse Curl"
  },
  {
    muscleGroup: "biceps",
    exercise: "Machine Curl"
  },
  {
    muscleGroup: "triceps",
    exercise: "Dips"
  },
  {
    muscleGroup: "triceps",
    exercise: "Close-Grip Bench Press"
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Pushdown"
  },
  {
    muscleGroup: "triceps",
    exercise: "Skull Crushers"
  },
  {
    muscleGroup: "triceps",
    exercise: "Overhead Tricep Extension"
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Kickbacks"
  },
  {
    muscleGroup: "triceps",
    exercise: "Diamond Push-Ups"
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Dumbbell Kickback"
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Rope Pushdown"
  },
  {
    muscleGroup: "triceps",
    exercise: "Close Grip Push-Ups"
  },
  {
    muscleGroup: "chest",
    exercise: "Bench Press"
  },
  {
    muscleGroup: "chest",
    exercise: "Dumbbell Flyes"
  },
  {
    muscleGroup: "chest",
    exercise: "Push-Ups"
  },
  {
    muscleGroup: "chest",
    exercise: "Incline Bench Press"
  },
  {
    muscleGroup: "chest",
    exercise: "Chest Dips"
  },
  {
    muscleGroup: "chest",
    exercise: "Decline Bench Press"
  },
  {
    muscleGroup: "chest",
    exercise: "Cable Crossover"
  },
  {
    muscleGroup: "chest",
    exercise: "Machine Chest Press"
  },
  {
    muscleGroup: "chest",
    exercise: "Incline Dumbbell Press"
  },
  {
    muscleGroup: "chest",
    exercise: "Pec Deck Machine"
  },
  {
    muscleGroup: "back",
    exercise: "Deadlifts"
  },
  {
    muscleGroup: "back",
    exercise: "Pull-Ups"
  },
  {
    muscleGroup: "back",
    exercise: "Bent Over Rows"
  },
  {
    muscleGroup: "back",
    exercise: "Lat Pulldowns"
  },
  {
    muscleGroup: "back",
    exercise: "Seated Cable Rows"
  },
  {
    muscleGroup: "back",
    exercise: "T-Bar Rows"
  },
  {
    muscleGroup: "back",
    exercise: "Single-Arm Dumbbell Rows"
  },
  {
    muscleGroup: "back",
    exercise: "Hyperextensions"
  },
  {
    muscleGroup: "back",
    exercise: "Chin-Ups"
  },
  {
    muscleGroup: "back",
    exercise: "Reverse Flyes"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Overhead Press (Barbell or Dumbbell)"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Lateral Raises"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Front Raises"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Upright Rows"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Arnold Press"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Shrugs"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Reverse Flyes"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Face Pulls"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Military Press"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Dumbbell Shoulder Press"
  },
  {
    muscleGroup: "quads",
    exercise: "Squats"
  },
  {
    muscleGroup: "quads",
    exercise: "Leg Press"
  },
  {
    muscleGroup: "quads",
    exercise: "Lunges"
  },
  {
    muscleGroup: "quads",
    exercise: "Leg Extensions"
  },
  {
    muscleGroup: "quads",
    exercise: "Hack Squats"
  },
  {
    muscleGroup: "quads",
    exercise: "Step-Ups"
  },
  {
    muscleGroup: "quads",
    exercise: "Bulgarian Split Squats"
  },
  {
    muscleGroup: "quads",
    exercise: "Front Squats"
  },
  {
    muscleGroup: "quads",
    exercise: "Goblet Squats"
  },
  {
    muscleGroup: "quads",
    exercise: "Box Jumps"
  },
  {
    muscleGroup: "glutes",
    exercise: "Squats"
  },
  {
    muscleGroup: "glutes",
    exercise: "Deadlifts"
  },
  {
    muscleGroup: "glutes",
    exercise: "Hip Thrusts"
  },
  {
    muscleGroup: "glutes",
    exercise: "Lunges"
  },
  {
    muscleGroup: "glutes",
    exercise: "Romanian Deadlifts"
  },
  {
    muscleGroup: "glutes",
    exercise: "Bulgarian Split Squats"
  },
  {
    muscleGroup: "glutes",
    exercise: "Step-Ups"
  },
  {
    muscleGroup: "glutes",
    exercise: "Glute Bridges"
  },
  {
    muscleGroup: "glutes",
    exercise: "Cable Kickbacks"
  },
  {
    muscleGroup: "glutes",
    exercise: "Donkey Kicks"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Romanian Deadlifts"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Lying Leg Curls"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Good Mornings"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Single-Leg Romanian Deadlifts"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Seated Leg Curls"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Stiff-Leg Deadlifts"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Swiss Ball Leg Curls"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Walking Lunges"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Reverse Hyperextensions"
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Glute-Ham Raises"
  },
  {
    muscleGroup: "abs",
    exercise: "Crunches"
  },
  {
    muscleGroup: "abs",
    exercise: "Planks"
  },
  {
    muscleGroup: "abs",
    exercise: "Russian Twists"
  },
  {
    muscleGroup: "abs",
    exercise: "Leg Raises"
  },
  {
    muscleGroup: "abs",
    exercise: "Mountain Climbers"
  },
  {
    muscleGroup: "abs",
    exercise: "Hanging Leg Raises"
  },
  {
    muscleGroup: "abs",
    exercise: "Bicycle Crunches"
  },
  {
    muscleGroup: "abs",
    exercise: "Ab Rollouts"
  },
  {
    muscleGroup: "abs",
    exercise: "Flutter Kicks"
  },
  {
    muscleGroup: "abs",
    exercise: "Side Planks"
  },
  {
    muscleGroup: "traps",
    exercise: "Barbell Shrugs"
  },
  {
    muscleGroup: "traps",
    exercise: "Dumbbell Shrugs"
  },
  {
    muscleGroup: "traps",
    exercise: "Upright Rows"
  },
  {
    muscleGroup: "traps",
    exercise: "Trap Bar Deadlifts"
  },
  {
    muscleGroup: "traps",
    exercise: "Farmer's Walk"
  },
  {
    muscleGroup: "traps",
    exercise: "Face Pulls"
  },
  {
    muscleGroup: "traps",
    exercise: "Power Cleans"
  },
  {
    muscleGroup: "traps",
    exercise: "Overhead Shrugs"
  },
  {
    muscleGroup: "traps",
    exercise: "Rack Pulls"
  },
  {
    muscleGroup: "traps",
    exercise: "Dumbbell High Pulls"
  },
  {
    muscleGroup: "forearms",
    exercise: "Wrist Curls"
  },
  {
    muscleGroup: "forearms",
    exercise: "Reverse Wrist Curls"
  },
  {
    muscleGroup: "forearms",
    exercise: "Hammer Curls"
  },
  {
    muscleGroup: "forearms",
    exercise: "Reverse Curls"
  },
  {
    muscleGroup: "forearms",
    exercise: "Farmer's Walk"
  },
  {
    muscleGroup: "forearms",
    exercise: "Plate Pinch"
  },
  {
    muscleGroup: "forearms",
    exercise: "Grip Strengthening Exercises"
  },
  {
    muscleGroup: "forearms",
    exercise: "Wrist Roller"
  },
  {
    muscleGroup: "forearms",
    exercise: "Towel Pull-Ups"
  },
  {
    muscleGroup: "forearms",
    exercise: "Dead Hangs"
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Raises (Standing)"
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Raises (Seated)"
  },
  {
    muscleGroup: "calves",
    exercise: "Donkey Calf Raises"
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Press on Leg Press Machine"
  },
  {
    muscleGroup: "calves",
    exercise: "Jump Rope"
  },
  {
    muscleGroup: "calves",
    exercise: "Box Jumps"
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Stretch"
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Raises (Single-Leg)"
  },
  {
    muscleGroup: "calves",
    exercise: "Farmer's Walk"
  },
  {
    muscleGroup: "calves",
    exercise: "Tibialis Raises"
  }
  ];

  export const weekdays: Weekday[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  
  export const muscleGroups: MuscleGroup[] = [
    "biceps",
    "triceps",
    "chest",
    "back",
    "shoulders",
    "quads",
    "glutes",
    "hamstrings",
    "abs",
    "traps",
    "forearms",
    "calves",
  ];
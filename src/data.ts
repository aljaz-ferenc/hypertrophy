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
    exercise: "Overhead Press (Barbell)"
  },
  {
    muscleGroup: "shoulders",
    exercise: "Overhead Press (Dumbbell)"
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

  export const restTips = [
    {title: 'Prioritize Sleep', description: ' Aim to get between 7 to 9 hours of quality sleep each night. Sleep is essential for physical and mental recovery, as it allows your body to repair tissues, regulate hormones, and consolidate learning and memory. Establishing a consistent sleep schedule and creating a relaxing bedtime routine can enhance the quality of your rest.'},
    {title: 'Active Recovery', description: ' Incorporate low-intensity activities into your rest days to promote blood circulation, alleviate muscle tension, and enhance overall mobility. Engage in activities such as walking, swimming, cycling, or gentle yoga sessions. These activities can help flush out metabolic waste products, reduce inflammation, and speed up the recovery process without causing additional strain on your muscles and joints.'},
    {title: 'Hydration', description: "Hydration is key to supporting your body's recovery efforts. Drink an adequate amount of water throughout the day to replenish fluids lost through sweat and to facilitate nutrient transport to your cells. Aim to drink at least 8 to 10 glasses of water daily, and consider adding electrolyte-rich beverages or coconut water to your hydration routine to replenish electrolytes lost during exercise."},
    {title: 'Nutrition', description: "Optimize your diet with nutrient-dense foods that provide essential vitamins, minerals, antioxidants, and macronutrients to fuel your body's recovery process. Focus on consuming a balanced mix of lean proteins, healthy fats, complex carbohydrates, fruits, and vegetables. Incorporating protein-rich foods like lean meats, fish, eggs, legumes, and dairy products can support muscle repair and growth, while antioxidants found in colorful fruits and vegetables can help reduce oxidative stress and inflammation."},
    {title: 'Listen to Your Body', description: "Pay close attention to your body's signals and adjust your training intensity and volume accordingly. If you're feeling fatigued, sore, or mentally drained, honor your body's need for rest and recovery. Avoid the temptation to push through pain or exhaustion, as this can increase your risk of injury and hinder long-term progress. Instead, use rest days as an opportunity to engage in self-care activities, such as meditation, foam rolling, or massage, to promote relaxation and stress relief."},
  ]

  export const foodItems = [
    {
        name: "Kinder Maxi King",
        calories: 2165,
        protein: 6.7,
        fat: 37.5,
        carbs: 38.2
    },
    {
        name: "Alpsko mleko 3.5",
        calories: 64,
        protein: 3.3,
        fat: 3.5,
        carbs: 4.7
    },
    {
        name: "Alpsko mleko 3.5 s proteini",
        calories: 45,
        protein: 6,
        fat: 0.4,
        carbs: 4.4
    },
    {
        name: "Protein muesli (chocolate)",
        calories: 395,
        protein: 22.5,
        fat: 11.7,
        carbs: 45.5
    },
    {
        name: "Whey protein (Battery, milk chocolate)",
        calories: 387,
        protein: 70,
        fat: 6.4,
        carbs: 12.3
    },
    {
        name: "Piščančja prsa (raw)",
        calories: 108,
        protein: 23.1,
        fat: 1.7,
        carbs: 0.5
    },
    {
        name: "Riž (beli)",
        calories: 354,
        protein: 6.7,
        fat: 0.4,
        carbs: 80
    },
    {
        name: "Omaka 4 vrste sira (Fant)",
        calories: 420,
        protein: 18,
        fat: 22,
        carbs: 35
    },
    {
        name: "Maxim lučka (mascarpone z višnjo)",
        calories: 327,
        protein: 4.11,
        fat: 19,
        carbs: 35
    },
    {
        name: "Sladoled",
        calories: 207,
        protein: 3.5,
        fat: 11,
        carbs: 24
    },
    {
        name: "Yoghurt drink (proteini.si, canilla ice cream)",
        calories: 60,
        protein: 6.8,
        fat: 0,
        carbs: 7.5
    },
    {
        name: "Egg",
        calories: 155,
        protein: 13,
        fat: 11,
        carbs: 1.1
    },
    {
        name: "Tuna (Spar)",
        calories: 359,
        protein: 17,
        fat: 32,
        carbs: 1.6
    },
    {
        name: "Cezarjev preliv (kuhne)",
        calories: 220,
        protein: 0.7,
        fat: 18,
        carbs: 13   
    },
    {
        name: "Štručka s hrenovko (Lidl)",
        calories: 350,
        protein: 10,
        fat: 32,
        carbs: 30
    },
    {
        name: "Mleto meso (svinjsko in goveje, Spar)",
        calories: 172,
        protein: 18,
        fat: 11,
        carbs: 0.5  
    },
    {
        name: "Omaka chilli con carne (Fant)",
        calories: 300,
        protein: 14,
        fat: 1.8,
        carbs: 51
    },
    {
        name: "Arašidovo maslo (Mercator)",
        calories: 605,
        protein: 27.3,
        fat: 48.2,
        carbs: 11.2
    }
]
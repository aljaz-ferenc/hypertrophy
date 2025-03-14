import { Exercise, FoodItem, MuscleGroup, Weekday } from "./types";

export const exercises = [
  {
    muscleGroup: "biceps",
    exercise: "Chin Ups",
  },
  {
    muscleGroup: "biceps",
    exercise: "Barbell Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Dumbbell Hammer Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Preacher Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Cable Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Incline Dumbbell Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Concentration Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "EZ Bar Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Reverse Curl",
  },
  {
    muscleGroup: "biceps",
    exercise: "Machine Curl",
  },
  {
    muscleGroup: "triceps",
    exercise: "Dips",
  },
  {
    muscleGroup: "triceps",
    exercise: "Close-Grip Bench Press",
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Pushdown",
  },
  {
    muscleGroup: "triceps",
    exercise: "Skull Crushers",
  },
  {
    muscleGroup: "triceps",
    exercise: "Overhead Tricep Extension",
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Kickbacks",
  },
  {
    muscleGroup: "triceps",
    exercise: "Diamond Push-Ups",
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Dumbbell Kickback",
  },
  {
    muscleGroup: "triceps",
    exercise: "Tricep Rope Pushdown",
  },
  {
    muscleGroup: "triceps",
    exercise: "Close Grip Push-Ups",
  },
  {
    muscleGroup: "chest",
    exercise: "Bench Press",
  },
  {
    muscleGroup: "chest",
    exercise: "Dumbbell Flyes",
  },
  {
    muscleGroup: "chest",
    exercise: "Push-Ups",
  },
  {
    muscleGroup: "chest",
    exercise: "Incline Bench Press",
  },
  {
    muscleGroup: "chest",
    exercise: "Chest Dips",
  },
  {
    muscleGroup: "chest",
    exercise: "Decline Bench Press",
  },
  {
    muscleGroup: "chest",
    exercise: "Cable Crossover",
  },
  {
    muscleGroup: "chest",
    exercise: "Machine Chest Press",
  },
  {
    muscleGroup: "chest",
    exercise: "Incline Dumbbell Press",
  },
  {
    muscleGroup: "chest",
    exercise: "Pec Deck Machine",
  },
  {
    muscleGroup: "back",
    exercise: "Deadlifts",
  },
  {
    muscleGroup: "back",
    exercise: "Pull-Ups",
  },
  {
    muscleGroup: "back",
    exercise: "Bent Over Rows",
  },
  {
    muscleGroup: "back",
    exercise: "Lat Pulldowns",
  },
  {
    muscleGroup: "back",
    exercise: "Seated Cable Rows",
  },
  {
    muscleGroup: "back",
    exercise: "T-Bar Rows",
  },
  {
    muscleGroup: "back",
    exercise: "Single-Arm Dumbbell Rows",
  },
  {
    muscleGroup: "back",
    exercise: "Hyperextensions",
  },
  {
    muscleGroup: "back",
    exercise: "Chin-Ups",
  },
  {
    muscleGroup: "back",
    exercise: "Reverse Flyes",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Overhead Press (Barbell)",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Overhead Press (Dumbbell)",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Lateral Raises",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Front Raises",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Upright Rows",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Arnold Press",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Shrugs",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Reverse Flyes",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Face Pulls",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Military Press",
  },
  {
    muscleGroup: "shoulders",
    exercise: "Dumbbell Shoulder Press",
  },
  {
    muscleGroup: "quads",
    exercise: "Squats",
  },
  {
    muscleGroup: "quads",
    exercise: "Leg Press",
  },
  {
    muscleGroup: "quads",
    exercise: "Lunges",
  },
  {
    muscleGroup: "quads",
    exercise: "Leg Extensions",
  },
  {
    muscleGroup: "quads",
    exercise: "Hack Squats",
  },
  {
    muscleGroup: "quads",
    exercise: "Step-Ups",
  },
  {
    muscleGroup: "quads",
    exercise: "Bulgarian Split Squats",
  },
  {
    muscleGroup: "quads",
    exercise: "Front Squats",
  },
  {
    muscleGroup: "quads",
    exercise: "Goblet Squats",
  },
  {
    muscleGroup: "quads",
    exercise: "Box Jumps",
  },
  {
    muscleGroup: "glutes",
    exercise: "Squats",
  },
  {
    muscleGroup: "glutes",
    exercise: "Deadlifts",
  },
  {
    muscleGroup: "glutes",
    exercise: "Hip Thrusts",
  },
  {
    muscleGroup: "glutes",
    exercise: "Lunges",
  },
  {
    muscleGroup: "glutes",
    exercise: "Romanian Deadlifts",
  },
  {
    muscleGroup: "glutes",
    exercise: "Bulgarian Split Squats",
  },
  {
    muscleGroup: "glutes",
    exercise: "Step-Ups",
  },
  {
    muscleGroup: "glutes",
    exercise: "Glute Bridges",
  },
  {
    muscleGroup: "glutes",
    exercise: "Cable Kickbacks",
  },
  {
    muscleGroup: "glutes",
    exercise: "Donkey Kicks",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Romanian Deadlifts",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Lying Leg Curls",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Good Mornings",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Single-Leg Romanian Deadlifts",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Seated Leg Curls",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Stiff-Leg Deadlifts",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Swiss Ball Leg Curls",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Walking Lunges",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Reverse Hyperextensions",
  },
  {
    muscleGroup: "hamstrings",
    exercise: "Glute-Ham Raises",
  },
  {
    muscleGroup: "abs",
    exercise: "Crunches",
  },
  {
    muscleGroup: "abs",
    exercise: "Planks",
  },
  {
    muscleGroup: "abs",
    exercise: "Russian Twists",
  },
  {
    muscleGroup: "abs",
    exercise: "Leg Raises",
  },
  {
    muscleGroup: "abs",
    exercise: "Mountain Climbers",
  },
  {
    muscleGroup: "abs",
    exercise: "Hanging Leg Raises",
  },
  {
    muscleGroup: "abs",
    exercise: "Bicycle Crunches",
  },
  {
    muscleGroup: "abs",
    exercise: "Ab Rollouts",
  },
  {
    muscleGroup: "abs",
    exercise: "Flutter Kicks",
  },
  {
    muscleGroup: "abs",
    exercise: "Side Planks",
  },
  {
    muscleGroup: "traps",
    exercise: "Barbell Shrugs",
  },
  {
    muscleGroup: "traps",
    exercise: "Dumbbell Shrugs",
  },
  {
    muscleGroup: "traps",
    exercise: "Upright Rows",
  },
  {
    muscleGroup: "traps",
    exercise: "Trap Bar Deadlifts",
  },
  {
    muscleGroup: "traps",
    exercise: "Farmer's Walk",
  },
  {
    muscleGroup: "traps",
    exercise: "Face Pulls",
  },
  {
    muscleGroup: "traps",
    exercise: "Power Cleans",
  },
  {
    muscleGroup: "traps",
    exercise: "Overhead Shrugs",
  },
  {
    muscleGroup: "traps",
    exercise: "Rack Pulls",
  },
  {
    muscleGroup: "traps",
    exercise: "Dumbbell High Pulls",
  },
  {
    muscleGroup: "forearms",
    exercise: "Wrist Curls",
  },
  {
    muscleGroup: "forearms",
    exercise: "Reverse Wrist Curls",
  },
  {
    muscleGroup: "forearms",
    exercise: "Hammer Curls",
  },
  {
    muscleGroup: "forearms",
    exercise: "Reverse Curls",
  },
  {
    muscleGroup: "forearms",
    exercise: "Farmer's Walk",
  },
  {
    muscleGroup: "forearms",
    exercise: "Plate Pinch",
  },
  {
    muscleGroup: "forearms",
    exercise: "Grip Strengthening Exercises",
  },
  {
    muscleGroup: "forearms",
    exercise: "Wrist Roller",
  },
  {
    muscleGroup: "forearms",
    exercise: "Towel Pull-Ups",
  },
  {
    muscleGroup: "forearms",
    exercise: "Dead Hangs",
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Raises (Standing)",
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Raises (Seated)",
  },
  {
    muscleGroup: "calves",
    exercise: "Donkey Calf Raises",
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Press on Leg Press Machine",
  },
  {
    muscleGroup: "calves",
    exercise: "Jump Rope",
  },
  {
    muscleGroup: "calves",
    exercise: "Box Jumps",
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Stretch",
  },
  {
    muscleGroup: "calves",
    exercise: "Calf Raises (Single-Leg)",
  },
  {
    muscleGroup: "calves",
    exercise: "Farmer's Walk",
  },
  {
    muscleGroup: "calves",
    exercise: "Tibialis Raises",
  },
  {
    muscleGroup: "neck",
    exercise: "Neck Extensions",
  },
  {
    muscleGroup: "neck",
    exercise: "Neck Curls",
  },
  {
    muscleGroup: 'back',
    exercise: 'Lat Prayers'
  },
  {
    muscleGroup: 'back',
    exercise: 'Seated Machine Rows'
  },
  {
    muscleGroup: 'back',
    exercise: "Ring Rows"
  },
  {
    muslceGroup: 'biceps',
    exercise: 'Ring Curls'
  },
  {
    muscleGroup: 'chest',
    exercise: "Ring Flyes"
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
  "neck",
];

export const restTips = [
  {
    title: "Prioritize Sleep",
    description:
      " Aim to get between 7 to 9 hours of quality sleep each night. Sleep is essential for physical and mental recovery, as it allows your body to repair tissues, regulate hormones, and consolidate learning and memory. Establishing a consistent sleep schedule and creating a relaxing bedtime routine can enhance the quality of your rest.",
  },
  {
    title: "Active Recovery",
    description:
      " Incorporate low-intensity activities into your rest days to promote blood circulation, alleviate muscle tension, and enhance overall mobility. Engage in activities such as walking, swimming, cycling, or gentle yoga sessions. These activities can help flush out metabolic waste products, reduce inflammation, and speed up the recovery process without causing additional strain on your muscles and joints.",
  },
  {
    title: "Hydration",
    description:
      "Hydration is key to supporting your body's recovery efforts. Drink an adequate amount of water throughout the day to replenish fluids lost through sweat and to facilitate nutrient transport to your cells. Aim to drink at least 8 to 10 glasses of water daily, and consider adding electrolyte-rich beverages or coconut water to your hydration routine to replenish electrolytes lost during exercise.",
  },
  {
    title: "Nutrition",
    description:
      "Optimize your diet with nutrient-dense foods that provide essential vitamins, minerals, antioxidants, and macronutrients to fuel your body's recovery process. Focus on consuming a balanced mix of lean proteins, healthy fats, complex carbohydrates, fruits, and vegetables. Incorporating protein-rich foods like lean meats, fish, eggs, legumes, and dairy products can support muscle repair and growth, while antioxidants found in colorful fruits and vegetables can help reduce oxidative stress and inflammation.",
  },
  {
    title: "Listen to Your Body",
    description:
      "Pay close attention to your body's signals and adjust your training intensity and volume accordingly. If you're feeling fatigued, sore, or mentally drained, honor your body's need for rest and recovery. Avoid the temptation to push through pain or exhaustion, as this can increase your risk of injury and hinder long-term progress. Instead, use rest days as an opportunity to engage in self-care activities, such as meditation, foam rolling, or massage, to promote relaxation and stress relief.",
  },
];

export const foodItems: FoodItem[] = [
  {
    name: "Kinder Maxi King",
    calories: 521,
    protein: 6.7,
    fat: 37.5,
    carbs: 38.2,
    id: "1",
  },
  {
    name: "Alpsko mleko 3.5",
    calories: 64,
    protein: 3.3,
    fat: 3.5,
    carbs: 4.7,
    id: "2",
  },
  {
    name: "Alpsko mleko 3.5 s proteini",
    calories: 45,
    protein: 6,
    fat: 0.4,
    carbs: 4.4,
    id: "3",
  },
  {
    name: "Protein muesli (chocolate)",
    calories: 395,
    protein: 22.5,
    fat: 11.7,
    carbs: 45.5,
    id: "4",
  },
  {
    name: "Whey protein (Battery, milk chocolate)",
    calories: 387,
    protein: 70,
    fat: 6.4,
    carbs: 12.3,
    id: "5",
  },
  {
    name: "Piščančja prsa (raw)",
    calories: 108,
    protein: 23.1,
    fat: 1.7,
    carbs: 0.5,
    id: "6",
  },
  {
    name: "Riž (beli)",
    calories: 354,
    protein: 6.7,
    fat: 0.4,
    carbs: 80,
    id: "7",
  },
  {
    name: "Omaka 4 vrste sira (Fant)",
    calories: 420,
    protein: 18,
    fat: 22,
    carbs: 35,
    id: "8",
  },
  {
    name: "Maxim lučka (mascarpone z višnjo)",
    calories: 327,
    protein: 4.11,
    fat: 19,
    carbs: 35,
    id: "9",
  },
  {
    name: "Sladoled",
    calories: 207,
    protein: 3.5,
    fat: 11,
    carbs: 24,
    id: "10",
  },
  {
    name: "Yoghurt drink (proteini.si, canilla ice cream)",
    calories: 60,
    protein: 6.8,
    fat: 0,
    carbs: 7.5,
    id: "11",
  },
  {
    name: "Egg",
    calories: 155,
    protein: 13,
    fat: 11,
    carbs: 1.1,
    id: "12",
  },
  {
    name: "Tuna (Spar)",
    calories: 359,
    protein: 17,
    fat: 32,
    carbs: 1.6,
    id: "13",
  },
  {
    name: "Cezarjev preliv (kuhne)",
    calories: 220,
    protein: 0.7,
    fat: 18,
    carbs: 13,
    id: "14",
  },
  {
    name: "Štručka s hrenovko (Lidl)",
    calories: 350,
    protein: 10,
    fat: 32,
    carbs: 30,
    id: "15",
  },
  {
    name: "Mleto meso (svinjsko in goveje, Spar)",
    calories: 172,
    protein: 18,
    fat: 11,
    carbs: 0.5,
    id: "16",
  },
  {
    name: "Omaka chilli con carne (Fant)",
    calories: 300,
    protein: 14,
    fat: 1.8,
    carbs: 51,
    id: "17",
  },
  {
    name: "Arašidovo maslo (Mercator)",
    calories: 605,
    protein: 27.3,
    fat: 48.2,
    carbs: 11.2,
    id: "18",
  },
  {
    name: "Cedevita ledena doza, naranca",
    calories: 94,
    protein: 0.2,
    fat: 0,
    carbs: 23,
    id: "19",
  },
  {
    name: "Cokolada Finesse classic white",
    calories: 548,
    protein: 7.9,
    fat: 32,
    carbs: 57,
    id: "20",
  },
  {
    name: "Spar salsa hot (315g)",
    calories: 55,
    protein: 0.9,
    fat: 0.2,
    carbs: 12,
    id: "21",
  },
  {
    name: "Kisla smetana Spar (180g)",
    calories: 203,
    protein: 2.5,
    fat: 20,
    carbs: 3.3,
    id: "22",
  },
  {
    name: "Sir edamec Zelene doline",
    calories: 335,
    protein: 24,
    fat: 25.3,
    carbs: 2.7,
    id: " 23",
  },
  {
    name: "Tortilje pšenične Spar (8 - 320g)",
    calories: 326,
    protein: 9.4,
    fat: 7.3,
    carbs: 55,
    id: "24",
  },
  {
    name: "Sončnično olje Spar (1 žlica - 15g)",
    calories: 830,
    protein: 0,
    fat: 92,
    carbs: 0,
    id: "25",
  },
  {
    name: "Calippo Strawberry (105g)",
    calories: 88,
    protein: 0,
    fat: 0,
    carbs: 22,
    id: "26",
  },
  {
    name: "Lučka King Secduction (84g)",
    calories: 308,
    protein: 4.4,
    fat: 19,
    carbs: 30,
    id: "27",
  },
  {
    name: "Protein bar Notus Fluffy Nougat (45g)",
    calories: 340,
    protein: 29,
    fat: 15,
    carbs: 18,
    id: "28",
  },
  {
    name: "Solata s tuno, ocvrto čebulo in jajcem (350g)",
    calories: 255,
    protein: 29.3,
    fat: 9.5,
    carbs: 13,
    id: "29",
  },
  {
    name: "Proteini.si protein bar - raspberry cheescake (55g)",
    calories: 421,
    protein: 22.5,
    fat: 17,
    carbs: 43,
    id: "30",
  },
  {
    name: "Ice Cream Sandwich Gelatelli (120g)",
    calories: 286,
    protein: 5.6,
    fat: 9.8,
    carbs: 42.9,
    id: "31",
  },
  {
    name: "Le Brie, Hood burger",
    calories: 900,
    protein: 35,
    fat: 60,
    carbs: 55,
    id: "32",
  },
  {
    name: "Ice Coffee, Double espresso (250g)",
    calories: 49,
    protein: 2.7,
    fat: 0.8,
    carbs: 7.7,
    id: "33",
  },
  {
    name: "Pizza burek, Lidl",
    calories: 600,
    protein: 10,
    fat: 30,
    carbs: 60,
    id: "34",
  },
  {
    name: "Solata pohanček (Minute, 250g)",
    calories: 193,
    protein: 10.6,
    fat: 1,
    carbs: 3.4,
    id: "35",
  },
  {
    name: "Rio mare (s fizolom)",
    calories: 210,
    protein: 11,
    fat: 14,
    carbs: 9,
    id: "36",
  },
  {
    name: "Sandwich Toast (Olz, 25g per slice)",
    calories: 274,
    protein: 7.8,
    fat: 3.7,
    carbs: 51,
    id: "37",
  },
  {
    name: "Proteini.si protein bar - pineapple coconut (55g)",
    calories: 417,
    protein: 22.6,
    fat: 16,
    carbs: 44.7,
    id: "38",
  },
  {
    name: "McChicken (140 g)",
    calories: 272,
    protein: 10,
    fat: 13,
    carbs: 28,
    id: "39",
  },
  {
    name: "KitKat donut (83g)",
    calories: 445,
    protein: 4.9,
    fat: 24,
    carbs: 52,
    id: "40",
  },
  {
    name: "Ice coffee Cappucino (250g)",
    calories: 56,
    protein: 2.6,
    fat: 0.8,
    carbs: 9.4,
    id: "41",
  },
  {
    name: "Rumenko jagoda(110g)",
    calories: 63,
    protein: 0,
    fat: 0,
    carbs: 17,
    id: "42",
  },
  {
    name: "Kinder chocolate (12.5g per bar)",
    calories: 566,
    protein: 8.7,
    fat: 35,
    carbs: 53.3,
    id: "43",
  },
  {
    name: "Protein peanut butter GO ON (salted caramel)",
    calories: 582,
    protein: 33,
    fat: 42,
    carbs: 17,
    id: "44",
  },
  {
    name: "Sendvic klasik (210g)",
    calories: 296,
    protein: 9.5,
    fat: 14,
    carbs: 33,
    id: "45",
  },
  {
    name: "Peanut butter Mercator",
    calories: 605,
    protein: 27.3,
    fat: 48.2,
    carbs: 11.2,
    id: "46",
  },
  {
    name: "Piscancji condon bleu (Ptuj)",
    calories: 195,
    protein: 14,
    fat: 9.7,
    carbs: 12,
    id: "47",
  },
  {
    name: "Francoska solata",
    calories: 215,
    protein: 2.4,
    fat: 18,
    carbs: 11,
    id: "48",
  },
  {
    name: "Chicken nuggets (15g per nugget)",
    calories: 243,
    protein: 15,
    fat: 12,
    carbs: 19,
    id: "49",
  },
  {
    name: "McSundae chocolate (180g)",
    calories: 178,
    protein: 5.4,
    fat: 8.2,
    carbs: 45.3,
    id: "50",
  },
  {
    name: "Pommes (mali - 70g, srednji - 120g, veliki - 155g)",
    calories: 231,
    protein: 2.7,
    fat: 11.2,
    carbs: 28.8,
    id: "51",
  },
  {
    name: "Manner napolitanke (75g block)",
    calories: 485,
    protein: 5.6,
    fat: 22,
    carbs: 65,
    id: "52",
  },
  {
    name: "Piscancji bagel",
    calories: 602,
    protein: 44.7,
    fat: 19,
    carbs: 66.4,
    id: "53",
  },
  {
    name: "Peanut caramel protein bar (Barbells - 55g)",
    calories: 394,
    protein: 29,
    fat: 20,
    carbs: 29,
    id: "54",
  },
  {
    name: "Dorina strawberry and vanilla (95g)",
    calories: 546,
    protein: 9.1,
    fat: 34,
    carbs: 51,
    id: "55",
  },
  {
    name: "Cup Noodles, Chicken (63g)",
    calories: 77,
    protein: 2.3,
    fat: 3.1,
    carbs: 9.6,
    id: "56",
  },
  {
    name: "Demae Ramer - chicken (100g)",
    calories: 91,
    protein: 2,
    fat: 4,
    carbs: 11.1,
    id: "57",
  },
  {
    name: "Fresh Wrap Crispy Chicken (262g)",
    calories: 195,
    protein: 8.9,
    fat: 8.7,
    carbs: 20.2,
    id: "58",
  },
  {
    name: "Honey-Mustard Wrap Grilled (300g)",
    calories: 194,
    protein: 8.2,
    fat: 11.3,
    carbs: 13.7,
    id: "59",
  },
  {
    name: "McFlavor Fries Cheddar (220g)",
    calories: 249,
    protein: 2.6,
    fat: 13.6,
    carbs: 25,
    id: "60",
  },
  {
    name: "Whey protein (Battery, wheytella)",
    calories: 387,
    protein: 70,
    fat: 6.3,
    carbs: 12.3,
    id: "61",
  },
  {
    name: "Coko panakota",
    calories: 364,
    protein: 4.5,
    fat: 30,
    carbs: 19,
    id: "62",
  },
  {
    name: "Stay Strong pudding hazelnut (200g)",
    calories: 73,
    protein: 10,
    fat: 0.9,
    carbs: 6.1,
    id: "63",
  },
  {
    name: "Manner Snack minis (25g)",
    calories: 521,
    protein: 7.5,
    fat: 29,
    carbs: 56,
    id: "64",
  },
  {
    name: "Isotonic (proteini.si, cherry)",
    calories: 521,
    protein: 7.5,
    fat: 29,
    carbs: 56,
    id: "65",
  },
  {
    name: "Cafe mio - cappuccino (250g)",
    calories: 74,
    protein: 2.8,
    fat: 2,
    carbs: 11,
    id: "66",
  },
  {
    name: "Waffelroellchen spar (25g per pack of 2)",
    calories: 523,
    protein: 6.5,
    fat: 28,
    carbs: 61,
    id: "67",
  },
  {
    name: "Reese's peanut butter cup (21g per cup)",
    calories: 533,
    protein: 10.7,
    fat: 10.5,
    carbs: 57.6,
    id: '68'
  },
  {
    name: "Mikla strawberry (100g)",
    calories: 560,
    protein: 4,
    fat: 35,
    carbs: 57,
    id: '69'
  },
  {
    name: "High protein chocolate mousse (Ehrmann)",
    calories: 74,
    protein: 10,
    fat: 1.5,
    carbs: 4.5,
    id: '70'
  },
  {
    name: "Kinder bueno white (2x 39g)",
    calories: 571,
    protein: 8.5,
    fat: 35.9,
    carbs: 53,
    id: '71'
  },
  {
    name: "King double (100g)",
    calories: 427,
    protein: 4.3,
    fat: 31,
    carbs: 33,
    id: '72'
  },
  {
    name: "Palačinke s čokolado (Lidl ' 180g)",
    calories: 297,
    protein: 6.8,
    fat: 13,
    carbs: 21,
    id: '73'
  },
  {
    name: "Trikotnik sendvič s tuno (Lidl - 140g)",
    calories: 292,
    protein: 13,
    fat: 15,
    carbs: 25,
    id: '74'
  },
  {
    name: "Kinder country (23.5g per bar)",
    calories: 561,
    protein: 8.6,
    fat: 33.8,
    carbs: 54.9,
    id: '75'
  }
];

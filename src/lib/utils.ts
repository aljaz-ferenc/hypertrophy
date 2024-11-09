import { Gender, HeightUnits, Measurement, WeightUnits } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { isThisWeek } from "date-fns"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcrypt';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type BRMData = {
  gender: Gender,
  age: number, 
  height: Omit<Measurement<HeightUnits>, 'date'>,
  weight: number,
  units: WeightUnits | HeightUnits
}

export function calculateBMR(data: BRMData) {
  const { gender, age, height, weight, units } = data;
  console.log(gender, age, height, weight, units)

  const weightKg = units === 'kg' ? weight : weight * 0.4536;
  const heightCm = units === 'cm' ? height.value : height.value * 2.54;

  if (gender === 'male') {
    return 66.47 + (13.75 * weightKg) + (5.003 * heightCm) - (6.755 * age);
  }

  return 655.1 + (9.563 * weightKg) + (1.85 * heightCm) - (4.676 * age);
}


export function getWeeklyAverageWeight(weightData: Measurement<WeightUnits>[]) {
  const thisWeeksData = weightData.filter(d => isThisWeek(d.date));

  if (thisWeeksData.length === 0) return null;

  const totalWeight = thisWeeksData.reduce((acc, d) => acc + d.value, 0);
  const averageWeight = totalWeight / thisWeeksData.length;

  const units = thisWeeksData[0].units; // Assuming all measurements are in the same units.

  return {
    weight: averageWeight,
    units: units
  };
}

export function getTodaysDay() {
  //get days (monday = 1 ... sunday = 7)
  return [7, 1, 2, 3, 4, 5, 6][new Date().getDay()];
}

export async function hashPassword(password: string){
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}
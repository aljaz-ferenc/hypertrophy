import {Gender, HeightUnits, Measurement, Nutrition, WeightUnits} from "@/types"
import {type ClassValue, clsx} from "clsx"
import {isThisWeek} from "date-fns"
import {twMerge} from "tailwind-merge"
import bcrypt from 'bcryptjs';
import nutrition from "@/database/models/Nutrition";

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
    const {gender, age, height, weight, units} = data;
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

export async function hashPassword(password: string) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const getAverageNutrition = (nutrition: Array<any>) => {
    return nutrition.reduce((acc, n) => {
        return {
            calories: Math.round(acc.calories + n.item.calories * n.amount / 100),
            protein: Math.round(acc.protein + n.item.protein * n.amount / 100),
            fat: Math.round(acc.fat + n.item.fat * n.amount / 100),
            carbs: Math.round(acc.carbs + n.item.carbs * n.amount / 100),
        }
    }, {calories: 0, protein: 0, fat: 0, carbs: 0})
}

export function groupBy(array, keyGetter) {
    return array.reduce((result, currentItem) => {
        const key = keyGetter(currentItem);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(currentItem);
        return result;
    }, {});
}

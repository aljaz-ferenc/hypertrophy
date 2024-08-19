import { create } from "zustand";

const activityLevels = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

export type ActivityLevel = keyof typeof activityLevels;

export type UserData = {
  dob?: Date;
  height?: number;
  weight?: number;
  activity?: ActivityLevel;
};

type WelcomeStore = {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
};

const useWelcomeStore = create<WelcomeStore>((set) => ({
  step: 0,
  nextStep: () =>
    set((state) => ({
      step: Math.min(state.step + 1, 4),
    })),
  previousStep: () =>
    set((state) => ({
      step: Math.max(state.step - 1, 0),
    })),
  userData: {},
  setUserData: (data) =>
    set((state) => {
      console.log(data)
       return {userData: { ...state.userData, ...data } }
      }),
}));

export default useWelcomeStore;

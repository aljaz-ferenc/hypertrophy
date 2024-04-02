import TodaysWorkout from "@/components/TodaysWorkout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypertrophy | Today's Workout",
  description: "Plan and track your workout mesocycles",
};

export default function TodaysWorkoutPage() {

  return (
    <div className="max-w-[800px] page-container">
    <h1>Today's Workout</h1>
      <TodaysWorkout/>
    </div>
  );
}

import CompletedMesocycles from "@/components/CompletedMesocycles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypertrophy | Completed Workouts",
  description: "Plan and track your workout mesocycles",
};

export default function CompletedMesocyclesPage() {
  
    return (
      <main className="w-full max-w-[1440px] mx-auto p-3 overflow-auto">
        <h1>Completed Workouts</h1>
        <CompletedMesocycles/>
      </main>
    );
  
}





import CompletedMesocycles from "@/components/CompletedMesocycles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypertrophy | Completed Workouts",
  description: "Plan and track your workout mesocycles",
};

export default function CompletedMesocyclesPage() {
  
    return (
      <main className="page-container overflow-auto">
        <h1>Completed Workouts</h1>
        <CompletedMesocycles/>
      </main>
    );
  
}





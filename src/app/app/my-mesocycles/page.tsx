import MyMesocycles from "@/components/MyMesocycles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypertrophy | My Mesocycles",
  description: "Plan and track your workout mesocycles",
};

export default function MyMesocyclesPage() {

  return (
    <main className="p-3 w-full mx-auto max-w-[1440px] overflow-auto">
      <h1>My Mesocycles</h1>
      <MyMesocycles/>
    </main>
  );
}

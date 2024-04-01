import MesocycleTips from "@/components/MesocycleTips";
import CreateMesocycle from "@/components/CreateMesocycle";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypertrophy | Create Mesocycle",
};

export default function CreateMesocyclePage() {

  return (
    <div className="p-3 overflow-hidden w-full max-w-[1440px] mx-auto">
      <div className="flex gap-3 items-start">
        <h1 className="mb-5">Create a Mesocycle</h1>
        <MesocycleTips />
      </div>
      <CreateMesocycle/>
    </div>
  );
}

"use client";

import DobForm from "@/components/welcome/DobForm";
import HeightForm from "@/components/welcome/HeightForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import WeightForm from "@/components/welcome/WeightForm";
import ActivityForm from "@/components/welcome/ActivityForm";
import ModeForm from "@/components/welcome/ModeForm";

enum WelcomeStep {
  DOB,
  HEIGHT,
  WEIGHT,
  ACTIVITY,
  MODE,
}

const components = {
  [WelcomeStep.DOB]: <DobForm />,
  [WelcomeStep.HEIGHT]: <HeightForm />,
  [WelcomeStep.WEIGHT]: <WeightForm />,
  [WelcomeStep.ACTIVITY]: <ActivityForm />,
  [WelcomeStep.MODE]: <ModeForm />,
};

export default function WelcomePage() {
  const [step, setStep] = useState(WelcomeStep.DOB);

  const CurrentStepComponent = components[step];

  return (
    <div>
      <h1>Tell us more about yourself</h1>
      <div className="">
        {CurrentStepComponent}
        {step >= Object.keys(components).length - 1 ? (
          <Button>Start</Button>
        ) : (
          <div className="flex justify-between w-full">
            <Button onClick={() => setStep((prevStep) => prevStep - 1)}>
              Back
            </Button>
            <Button onClick={() => setStep((prevStep) => prevStep + 1)}>
              Next
            </Button>
          </div>
        )}
        {/* <small>This info is used only to create your profile and provide recommendations for your workouts and nutrition.</small> */}
      </div>
    </div>
  );
}

function Mode() {
  return <>Mode</>;
}

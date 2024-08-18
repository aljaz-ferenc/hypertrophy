"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

enum WelcomeStep {
  DOB,
  HEIGHT,
  WEIGHT,
  ACTIVITY,
  MODE,
}

const components = {
  [WelcomeStep.DOB]: Dob,
  [WelcomeStep.HEIGHT]: Height,
  [WelcomeStep.WEIGHT]: Weight,
  [WelcomeStep.ACTIVITY]: Activity,
  [WelcomeStep.MODE]: Mode,
};

export default function WelcomePage() {
  const [step, setStep] = useState(WelcomeStep.DOB);

  return (
    <div className="h-screen w-screen grid place-items-center">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Tell us more about yourself</CardTitle>
        </CardHeader>
        <CardContent>{components[step]()}</CardContent>
        <CardFooter>
          {step >= Object.keys(components).length - 1 ? (
            <Button>Start</Button>
          ) : (
            <Button onClick={() => setStep((step) => step + 1)}>Next</Button>
          )}
          {/* <small>This info is used only to create your profile and provide recommendations for your workouts and nutrition.</small> */}
        </CardFooter>
      </Card>
    </div>
  );
}

function Dob() {
  return <>Dob</>;
}

function Height() {
  return <>Height</>;
}

function Weight() {
  return <>Weight</>;
}

function Activity() {
  return <>Activity</>;
}

function Mode() {
  return <>Mode</>;
}

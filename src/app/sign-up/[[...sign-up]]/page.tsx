import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <SignUp />
    </div>
  );
}

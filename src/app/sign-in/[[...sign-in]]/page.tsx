import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  CopyToClipboard  from "@/components/CopyToClipboard";
import { SignIn } from "@clerk/nextjs";

import React from "react";

export default function SignInPage() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <SignIn />
      <div className='mt-5'>
        <p className='mb-5'>To review the app you can use the demo account:</p>
        <div className='flex flex-col gap-3'>
          <div className='flex gap-2 items-start flex-col'>
            <Label>Username</Label>
            <div className='flex items-center gap-2  w-full'>
            <Input type='text' value='demo_user' readOnly/>
            <CopyToClipboard content={'demo_user'}/>
            </div>
          </div>
          <div className='flex gap-2 items-start flex-col'>
            <Label>Password</Label>
            <div className='flex items-center gap-2  w-full'>
            <Input type='password' value='demo_user1234' readOnly/>
            <CopyToClipboard content={'demo_user1234'}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



import {SignUp} from "@clerk/nextjs";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Hypertrophy | Sign Up"
};

export default function SignUpPage() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className='flex flex-col items-center gap-10'>

                <img src='/logo-text.svg'/>
                <SignUp/>
            </div>
        </div>
    );
}

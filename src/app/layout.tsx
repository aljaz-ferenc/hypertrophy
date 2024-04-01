import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import WorkoutContextProvider from "@/context/MesocycleContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import LogContextProvider from "@/context/LogContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hypertrophy",
  description: "Plan and track your workout mesocycles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html className="dark custom-scrollbar overflow-x-hidden max-w-screen" lang="en">
      <WorkoutContextProvider>
        <LogContextProvider>
        <body className={`${inter.className} bg-background w-full min-h-screen flex custom-scrollbar`}>
          {children}
          <Toaster/>
        </body>
        </LogContextProvider>
      </WorkoutContextProvider>
    </html>
    </ClerkProvider>
  );
}

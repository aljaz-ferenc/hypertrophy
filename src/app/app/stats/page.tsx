"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addWeight, getStats, updateStats } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { Measurement, Stats, WeightUnits } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import LineChart from "@/components/LineChart";

const weightData: any[] = [
  { date: new Date("2024-08-01"), value: 75 },
  { date: new Date("2024-08-02"), value: 74.5 },
  { date: new Date("2024-08-03"), value: 74.8 },
  { date: new Date("2024-08-04"), value: 75.1 },
  { date: new Date("2024-08-05"), value: 74.9 },
  { date: new Date("2024-08-06"), value: 75.2 },
  { date: new Date("2024-08-07"), value: 75.0 },
];

const weightSchema = z.object({
  weight: z.coerce.number().optional(),
});

type WeightForm = z.infer<typeof weightSchema>;

// Zod schema to validate number-like strings
const statsSchema = z.object({
  height: z.coerce.number(),
  weight: z.coerce.number(),
});

type StatsForm = z.infer<typeof statsSchema>;

export default function MeasurementsForm() {
  const { userId } = useAuth();
  const [date, setDate] = useState<Date>();
  const [stats, setStats] = useState<Stats>();
  const [isAddingWeight, setIsAddingWeight] = useState(false)

  useEffect(() => {
    if(!userId) return
    getStats(userId)
      .then(stats => setStats(stats))
  }, [])

  const form = useForm<StatsForm>({
    resolver: zodResolver(statsSchema),
  });

  const weightForm = useForm<WeightForm>({
    resolver: zodResolver(weightSchema),
  });

  function onSubmitWeight(data: FieldValues) {
    if (!userId) return;
    setIsAddingWeight(true)
    const { weight } = data;
    const weightMeasurement: Measurement<WeightUnits> = {
      value: weight,
      date: new Date(),
      units: "kg",
    };
    addWeight(userId, weightMeasurement)
    .then(() => {
      return getStats(userId);
    })
    .then((stats) => {
      setStats(stats);
      console.log("STATS: ", stats)
    })
    .finally(() => {
      weightForm.reset({weight: NaN})
      setIsAddingWeight(false)
    })
  }

  function onSubmit(values: StatsForm) {
    if (!userId) return;
    const { height, weight } = values;

    const newStats: Partial<Stats> = {};

    if (height) {
      newStats.height = {
        value: height,
        units: "cm",
      };
    }

    if (date !== undefined) {
      newStats.dob = date;
    }
    console.log(newStats);
    updateStats(userId, newStats)
      .then(() => {
        return getStats(userId);
      })
      .then((stats) => {
        setStats(stats);
        console.log("STATS: ", stats?.weight)
      });
  }

  return (
    <div className="page-container">
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Popover>
            <div className="flex flex-col">

            <FormLabel className="mb-2">Date of Birth</FormLabel>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </div>
          </Popover>
          <FormField
            key={"height"}
            control={form.control}
            name={"height"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Height"}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
      <Form {...weightForm}>
        <form onSubmit={weightForm.handleSubmit(onSubmitWeight)}>
          <FormField
            key={"weight"}
            control={weightForm.control}
            name={"weight"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Weight"}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isAddingWeight}>Add</Button>
        </form>
      </Form>
      {stats?.weight?.length && <LineChart data={stats?.weight} />}
    </div>
  );
}

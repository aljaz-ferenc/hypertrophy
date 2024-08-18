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
import { calculateBMR, cn, getWeeklyAverageWeight } from "@/lib/utils";
import { differenceInDays, differenceInYears, format } from "date-fns";
import { useEffect, useState } from "react";
import LineChart from "@/components/LineChart";
import WeightForm from "@/components/WeightForm";

const statsSchema = z.object({
  height: z.coerce.number(),
});

type StatsForm = z.infer<typeof statsSchema>;

export default function MeasurementsForm() {
  const [stats, setStats] = useState<Stats>();
  const [date, setDate] = useState<Date | undefined>(stats?.dob);
  const {userId} = useAuth()

  useEffect(() => {
    if(!userId) return
    getStats(userId)
      .then(stats => {
        setDate(stats?.dob)
        setStats(stats)
      })
  }, [userId])

  const form = useForm<StatsForm>({
    resolver: zodResolver(statsSchema),
  });
  
  //submit height, dob and bmr
  function onSubmit(values: StatsForm) {
    if (!userId) return;
    const { height } = values;

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
    
    if(newStats.dob && newStats.height && stats?.weight.length && stats?.weight.length > 0){
      const age =  differenceInYears(new Date(), newStats.dob)
      const weight = getWeeklyAverageWeight(stats.weight) || {weight: stats.weight.at(-1)?.value, units: stats.weight[0].units} 
      
      if(weight) {
        //TODO: get gender from user input
        //TODO: only calculate bmr once a week with previous weeks weight data
        const bmr = calculateBMR({gender: 'male', age, height: newStats.height!, weight: weight.weight!, units: stats.weight.at(-1)!.units})
        newStats.bmr = Math.round(bmr)
        console.log(bmr)
      }
    }

    updateStats(userId, newStats)
    .then(() => {
     return getStats(userId)
    })
    .then(stats => setStats(stats))
  }

  return (
    <div className="page-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Popover>
            <div className="flex flex-col">
            <FormLabel className="mb-2">Date of Birth</FormLabel>
           {stats?.dob && <p>Age: {differenceInYears(new Date(), stats.dob)}</p>}
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
                {stats?.height && <p>{stats.height.value}{stats.height.units}</p>}
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <WeightForm/>
      <div>
        <h3>Basal Metabolic Rate (BMR)</h3>
        {stats?.bmr || 'To calculate your BMR, add your gender, age, height and weight.'}
      </div>
    </div>
  );
}

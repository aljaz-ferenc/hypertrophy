"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LineChart from "./LineChart";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Measurement, WeightUnits } from "@/types";
import { addWeight, getStats } from "@/actions";

const weightSchema = z.object({
  weight: z.coerce.number().optional(),
});

type WeightForm = z.infer<typeof weightSchema>;

export default function WeightForm() {
  const [isAddingWeight, setIsAddingWeight] = useState(false);
  const { userId } = useAuth();
  const [weight, setWeight] = useState<Measurement<WeightUnits>[]>();

  useEffect(() => {
    if (!userId) return;
    getStats(userId).then((stats) => setWeight(stats?.weight));
  }, [userId]);

  const weightForm = useForm<WeightForm>({
    resolver: zodResolver(weightSchema),
  });

  const onSubmitWeight = async (data: FieldValues) => {
    if (!userId) return;
    setIsAddingWeight(true);
    const { weight } = data;
    const weightMeasurement: Measurement<WeightUnits> = {
      value: weight,
      date: new Date(),
      units: "kg",
    };

    try {
      await addWeight(userId, weightMeasurement);
      const updatedStats = await getStats(userId);
      setWeight(updatedStats?.weight);
    } catch (error) {
      console.error("Failed to add weight:", error);
    } finally {
      weightForm.reset({ weight: NaN });
      setIsAddingWeight(false);
    }
  };

  return (
    <div className="w-screen">
      <FormProvider {...weightForm}>
        <form onSubmit={weightForm.handleSubmit(onSubmitWeight)}>
          <FormField
            name="weight"
            control={weightForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isAddingWeight}>
            Add
          </Button>
        </form>
        {weight && <LineChart data={weight} />}
      </FormProvider>
    </div>
  );
}

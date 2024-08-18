"use client";

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
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const dobSchema = z.object({
  day: z
    .string()
    .min(2, "Day must be exactly 2 digits")
    .regex(/^(0[1-9]|[12][0-9]|3[01])$/, "Invalid day"),
  month: z
    .string()
    .min(2, "Month must be exactly 2 digits")
    .regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
  year: z
    .string()
    .min(4, "Year must be exactly 4 digits")
    .regex(/^(19[0-9]{2}|20[0-9]{2})$/, "Invalid year"),
});

function submit(values: FieldValues) {
  console.log(values);
}

export default function DobForm() {
  const form = useForm<z.infer<typeof dobSchema>>({
    resolver: zodResolver(dobSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={() => {}}>
          <FormItem>
            <FormLabel>Day</FormLabel>
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormControl>
                  <Input {...field} placeholder="DD" />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Month</FormLabel>
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormControl>
                  <Input {...field} placeholder="MM" />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Year</FormLabel>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormControl>
                  <Input {...field} placeholder="YYYY" />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
}

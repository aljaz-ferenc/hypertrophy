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

const heightSchema = z.object({
  height: z
    .string()
    .regex(/^\d+(\.\d)?$/, "Only numbers up to 1 decimal point"),
});

export default function HeightForm() {
  const form = useForm<z.infer<typeof heightSchema>>({
    resolver: zodResolver(heightSchema),
    defaultValues: {
      height: "",
    },
  });

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={() => {}}>
          <FormItem>
            <FormLabel>Your height</FormLabel>
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
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

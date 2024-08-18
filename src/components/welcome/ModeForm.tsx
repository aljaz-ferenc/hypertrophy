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
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const modeSchema = z.object({
  mode: z
    .string()
    .regex(/^\d+(\.\d)?$/, "Only numbers up to 1 decimal point"),
});

export default function ModeForm() {
  const form = useForm<z.infer<typeof modeSchema>>({
    resolver: zodResolver(modeSchema),
    defaultValues: {
      mode: "",
    },
  });

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={() => {}}>
          <FormItem>
            <FormLabel>Your mode</FormLabel>
            <FormField
              control={form.control}
              name="mode"
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

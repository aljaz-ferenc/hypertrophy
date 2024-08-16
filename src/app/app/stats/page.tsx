'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { updateStats } from "@/actions"
import { useAuth } from "@clerk/nextjs"
import { Stats } from "@/types"

// Zod schema to validate number-like strings
const statsSchema = z.object({
  age: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
})

type StatsForm = z.infer<typeof statsSchema>


export default function MeasurementsForm() {
  const {userId} = useAuth()
  const form = useForm<StatsForm>({
    resolver: zodResolver(statsSchema)
  })
  
  function onSubmit(values: StatsForm) {
    if (!userId) return;
    const { age, height, weight } = values;
  
    const newStats: Partial<Stats> = {};
  
    if (height) {
      newStats.height = {
        value: height,
        units: 'cm'
      };
    }
  
    if (age !== undefined) {
      newStats.age = age;
    }

  
    updateStats(userId, newStats);
  }

  return (
    <div className="page-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            key={'age'}
            control={form.control}
            name={'age'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'Age'}</FormLabel>
                <FormControl>
                  <Input {...field} 
                  type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={'height'}
            control={form.control}
            name={'height'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'Height'}</FormLabel>
                <FormControl>
                  <Input {...field} 
                  type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={'weight'}
            control={form.control}
            name={'weight'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'Weight'}</FormLabel>
                <FormControl>
                  <Input {...field} 
                  type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const statsSchema = z.object({
    neck: z.number().optional(),
    bicepRight: z.number().optional(),
    bicepLeft: z.number().optional(),
    forearmRight: z.number().optional(),
    forearmLeft: z.number().optional(),
    chest: z.number().optional(),
    thighRight: z.number().optional(),
    thighLeft: z.number().optional(),
    calfRight: z.number().optional(),
    calfLeft: z.number().optional()
  })
  
  const inputs = [
    {
      name: 'neck',
      label: 'Neck'
    },
    {
      name: 'bicepRight',
      label: 'Right Bicep'
    },
    {
      name: 'bicepLeft',
      label: 'Left Bicep'
    },
    {
      name: 'forearmRight',
      label: 'Right Forearm'
    },
    {
      name: 'forearmLeft',
      label: 'Left Forearm'
    },
    {
      name: 'chest',
      label: 'Chest'
    },
    {
      name: 'thighRight',
      label: 'Right Thigh'
    },
    {
      name: 'thighLeft',
      label: 'Left Thigh'
    },
    {
      name: 'calfRight',
      label: 'Right Calf'
    },
    {
      name: 'calfLeft',
      label: 'Left Calf'
    }
  ] as const
  
  
  type StatsForm = z.infer<typeof statsSchema>
  
  function onSubmit(values: StatsForm){
    console.log(values)
  }

export default function MeasurementsForm(){
    const form = useForm<StatsForm>({
        resolver: zodResolver(statsSchema)
      })
      
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {inputs.map(input => (
            <FormField
            key={input.name}
              control={form.control}
              name={input.name as "neck" | "bicepRight" | "bicepLeft" | "forearmRight" | "forearmLeft" | "chest" | "thighRight" | "thighLeft" | "calfRight" | "calfLeft"}
              render={({field}) => (
                <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}
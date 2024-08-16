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
    age: z.number().optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
    
  })

  
  type StatsForm = z.infer<typeof statsSchema>
  
  function onSubmit(values: StatsForm){
    console.log(values)
  }

export default function MeasurementsForm(){
    const form = useForm<StatsForm>({
        resolver: zodResolver(statsSchema)
      })
      
    return (
      <div className="page-container">

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            key={'age'}
              control={form.control}
              name={'age'}
              render={({field}) => (
                <FormItem>
                <FormLabel>{'Age'}</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
            key={'height'}
              control={form.control}
              name={'height'}
              render={({field}) => (
                <FormItem>
                <FormLabel>{'Height'}</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
            key={'weight'}
              control={form.control}
              name={'weight'}
              render={({field}) => (
                <FormItem>
                <FormLabel>{'Weight'}</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
                </FormItem>
              )}
            />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
              </div>
    )
}
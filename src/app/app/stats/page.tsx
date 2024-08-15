
'use client'

import { getStats } from "@/actions"
import Bmr from "@/components/Bmr"
import MeasurementsForm from "@/components/MeasurementsForm"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Stats } from "@/types"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import {useState, useEffect} from 'react'
import { Form, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  height: z.number(),
  weight: z.number(),
  age: z.number(),
  gender: z.enum(['male', 'female'])
})

type StatsForm = z.infer<typeof schema>

function onSubmit(values: StatsForm){
  console.log(values)
}

export default function StatsPage() {
  const {userId} = useAuth()
  const [stats, setStats] = useState<Stats>()
  const form = useForm<StatsForm>({
    resolver: zodResolver(schema)
  })
  
  useEffect(() => {
    updateStats()
  }, [])
  
  async function updateStats(){
    const stats = await getStats(userId!)
    console.log(stats)
    setStats(stats)
  }

  

  

  return (
    <main className="page-container overflow-auto">
      <h1>StatsPage</h1>
        <Form {...form}>
      <form>
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
      </form>
        </Form>
      {/* <p>{stats.height}</p> */}
      {/* <Bmr/>
      <MeasurementsForm/> */}
    </main>
  )
}

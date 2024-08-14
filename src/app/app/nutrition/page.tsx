'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {foodItems} from '@/data'
import { FoodItem, Nutrition } from "@/types"
import {useEffect, useState} from 'react'
import { Input } from "@/components/ui/input"
import FoodItemInput from "@/components/FoodItemInput"
import {useNutritionStore} from '@/store/nutrition.store'
import { getThisWeeksNutrition, updateUserNutrition } from "@/actions"
import { useClerk } from "@clerk/nextjs"
import BarChart from "@/components/BarChart"

export default function NutritionPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [nutritionTotal] = useState<Nutrition>({calories: 0, protein: 0, fat: 0, carbs: 0})
  const {items, addFoodItem, getTotalNutrition} = useNutritionStore(state => state)
  const {user} = useClerk()
  const [thisWeeksNutrition, setThisWeeksNutrition] = useState<any>([])

  const fetchNutritionData = async () => {
    if (user) {
      try {
        const nutritionData = await getThisWeeksNutrition(user.id);
        setThisWeeksNutrition(nutritionData);
      } catch (error) {
        console.error("Failed to fetch nutrition data:", error);
      }
    }
  };

  useEffect(() => {
    fetchNutritionData();
  }, [user]);

  async function onSave(){
    await updateUserNutrition(user!.id, getTotalNutrition())
    fetchNutritionData()
  }

  return (
    <div className="page-container">
      <h1>Nutrition</h1>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant={'outline'} role="combobox" aria-expanded={isOpen}>
            {'Select item...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-max'>
          <Command>
            <CommandInput placeholder={'Search...'}/>
            <CommandEmpty>No items found...</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {foodItems.map((item: FoodItem) => (
                  <CommandItem
                  className='m-0 p-0'
                    key={item.name}
                    value={item.name}
                    onSelect={() => {
                      addFoodItem({...item, amount: 0, id: crypto.randomUUID()})
                      setIsOpen(false)
                      console.log(items)
                    }}
                  >
                    <Button variant='ghost' className='w-full h-full flex justify-start'>
                    {item.name}
                    </Button>
                    </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='flex flex-col gap-5 mt-10'>
        {items && (
          items.map((item, i) => (
            <FoodItemInput item={item} key={item.id}/>
          ))
        )}
      </div>
      <Button onClick={onSave} className='mt-10'>Save</Button>
        {!!thisWeeksNutrition.length && <BarChart data={thisWeeksNutrition} className={'mx-auto p-3 mt-[10rem]'}/>}
    </div>
  )
}

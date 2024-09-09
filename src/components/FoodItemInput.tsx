import { FoodItem, Nutrition } from "@/types"
import { Input } from "./ui/input"
import { useState } from "react"
import {useNutritionStore} from '@/store/nutrition.store'

type FoodItemInputProps = {
    item: any
}

export default function FoodItemInput({item}: FoodItemInputProps){
    // const itemWithAmount = {...item, amount: 0}
    // const [itemWithAmount, setItemWithAmount] = useState({...item, amount: 0})
    const {items, addFoodItem, updateItemAmount} = useNutritionStore(state => state)

    return (
        <div key={item.name} className='flex flex-col items-start justify-center gap-2'>
              <p>{item.name}</p>
              <div className='flex items-baseline gap-1'>
              <Input className='w-20' type="number" value={item.amount} onChange={(e) =>{
                  updateItemAmount(item.id, Number(e.target.value))
                }}/>
              <span>g</span>
                </div>
            </div>
    )
}
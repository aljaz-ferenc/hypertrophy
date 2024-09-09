"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { foodItems } from "@/data";
import { FoodItem, Nutrition } from "@/types";
import { useMemo, useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import FoodItemInput from "@/components/FoodItemInput";
import { useNutritionStore } from "@/store/nutrition.store";
import { addNutrition, getStats, getThisWeeksNutrition } from "@/actions";
import { useAuth, useClerk } from "@clerk/nextjs";
import BarChart from "@/components/BarChart";
import { Pie, PieChart } from "recharts";
import PieChartComponent from "@/components/PieChart";

export default function NutritionPage() {
  const [isOpen, setIsOpen] = useState(false);
  // const [nutritionTotal] = useState<Nutrition>({
  //   calories: 0,
  //   protein: 0,
  //   fat: 0,
  //   carbs: 0,
  // });
  const { items, addFoodItem, getTotalNutrition, clearItems } =
    useNutritionStore((state) => state);
  const { userId } = useAuth();
  const [thisWeeksNutrition, setThisWeeksNutrition] = useState<any[]>([]);
  const pageRef = useRef<any>();
  const [pageWidth, setPageWidth] = useState(
    pageRef.current?.getBoundingClientRect().width || 0
  );
  const [bmr, setBmr] = useState<number>(2342)

  const fetchNutritionData = async () => {
    if (userId) {
      try {
        const nutritionData = await getThisWeeksNutrition(userId);
        console.log(nutritionData)
        setThisWeeksNutrition(nutritionData);
      } catch (error) {
        console.error("Failed to fetch nutrition data:", error);
      }
    }
  };

  const weeklyTotalNutrition = useMemo(() => {
    if (!thisWeeksNutrition) return;
    return thisWeeksNutrition.reduce(
      (acc: any, item: any) => {
        const itemData = foodItems.find(i => i.id === item.itemId)
        if(!itemData) return acc
        const calories = (item.amount / 100) * itemData.calories
        const protein = (item.amount / 100) * itemData.protein
        const fat = (item.amount / 100) * itemData.fat
        const carbs = (item.amount / 100) * itemData.carbs

        return {
          calories: Math.round(acc.calories + calories),
          carbs: Math.round(acc.carbs + carbs),
          fat: Math.round(acc.fat + fat),
          protein: Math.round(acc.protein + protein),
        };
      },
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );
  }, [thisWeeksNutrition]);

  // const dailyAverageNutrition = useMemo(() => {
  //   if (!thisWeeksNutrition) return;
  //   const weeklyTotal = weeklyTotalNutrition;

  //   return {
  //     calories: Math.round(weeklyTotal.calories / thisWeeksNutrition.length),
  //     protein: Math.round(weeklyTotal.protein / thisWeeksNutrition.length),
  //     carbs: Math.round(weeklyTotal.carbs / thisWeeksNutrition.length),
  //     fat: Math.round(weeklyTotal.fat / thisWeeksNutrition.length),
  //   };
  // }, [thisWeeksNutrition]);

  useEffect(() => {
    fetchNutritionData();
  }, [userId]);

  useEffect(() => {
    setPageWidth(pageRef.current.getBoundingClientRect().width);

    addEventListener("resize", onResize);

    function onResize() {
      setPageWidth(pageRef.current.getBoundingClientRect().width);
    }

    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);

  async function onSave() {
    // await updateUserNutrition(userId!, getTotalNutrition());
    // fetchNutritionData();
    // clearItems();
    console.log(items)
    addNutrition(userId!, items)
  }

  return (
    <div className="page-container" ref={pageRef}>
      <h1>Nutrition</h1>
      <div className="flex flex-col gap-5">
      {!!thisWeeksNutrition.length &&  thisWeeksNutrition.map(item => {
        const itemData = foodItems.find(i => i.id === item.itemId)
        if(!itemData) return null
        const calories = itemData.calories * (item.amount / 100)
        
        return (
          <div key={item._id} className='border border-slate-50 flex gap-3 p-2'>
            <p>{itemData.name}</p>
            <p>Calories: {Math.round(calories)}</p>
          </div>
        )
      })}
       <div>
        <p className={'font-semibold text-xl'}>TDEE: {bmr} kcal</p>
          <p>Total calories: {weeklyTotalNutrition.calories} kcal</p>
          <p>Total protein: {weeklyTotalNutrition.protein} g</p>
          <p>Total fat {weeklyTotalNutrition.fat} g</p>
          <p>Total carbs: {weeklyTotalNutrition.carbs} g</p>
        </div>
      </div>
      {!!thisWeeksNutrition.length && (
         <BarChart
         data={thisWeeksNutrition}
         width={pageWidth}
         className={"mx-auto p-3"}
         bmr={bmr!}
       />
      )}
      {/* {!!thisWeeksNutrition.length && (
        <div>
          <h2 className="text-2xl font-semibold mb-5">Stats</h2>
         <BarChart
            data={thisWeeksNutrition}
            width={pageWidth}
            className={"mx-auto p-3"}
            bmr={bmr!}
          />
          <div className="flex gap-5 mt-5">
            <div className="">
              <h3 className="text-xl font-semibold">Week Total</h3>
              <ul>
                <li>Calories: {weeklyTotalNutrition.calories} kcal</li>
                <li>Protein: {weeklyTotalNutrition.protein}g</li>
                <li>Carbs: {weeklyTotalNutrition.carbs}g</li>
                <li>Fat: {weeklyTotalNutrition.fat}g</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Daily Average</h3>
              <ul>
                <li>Calories: {dailyAverageNutrition?.calories} kcal</li>
                <li>Protein: {dailyAverageNutrition?.protein}g</li>
                <li>Carbs: {dailyAverageNutrition?.carbs}g</li>
                <li>Fat: {dailyAverageNutrition?.fat}g</li>
              </ul>
            </div>
          </div>
          <div className="mt-20"></div>
        </div>
      )} */}
      <div className="flex flex-col gap-5 mt-10">
        <h2 className="text-2xl font-semibold mb-2">Add Items</h2>
        {items &&
          items.map((item, i) => (
            <div key={i} className="flex items-center border border-gray-200 rounded p-3 max-w-fit">
              <FoodItemInput item={item} key={item.id} />
              <PieChartComponent
                protein={Math.round(item.protein * (item.amount / 100))}
                carbs={Math.round(item.carbs * (item.amount / 100))}
                fat={Math.round(item.fat * (item.amount / 100))}
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-3 max-w-[10rem] mt-3">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant={"outline"} role="combobox" aria-expanded={isOpen}>
              {"Select item..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-max">
            <Command>
              <CommandInput placeholder={"Search..."} />
              <CommandEmpty>No items found...</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {foodItems.map((item: FoodItem) => (
                    <CommandItem
                      className="m-0 p-0"
                      key={item.name}
                      value={item.name}
                      onSelect={() => {
                        addFoodItem({
                          amount: 0,
                          itemId: item.id,
                          date: new Date(),
                          user: userId,
                          item: item.name
                        });
                        setIsOpen(false);
                      }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full h-full flex justify-start"
                      >
                        {item.name}
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          disabled={items.length === 0}
          onClick={onSave}
          className="mt-10"
        >
          Save
        </Button>
        {items.length > 0 && (
          <Button variant="destructive" onClick={clearItems}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

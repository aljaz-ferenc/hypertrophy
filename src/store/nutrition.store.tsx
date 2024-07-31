import { create } from 'zustand';

type Store = {
    items: any[],
    addFoodItem: (newItem: any) => void
    updateItemAmount: (itemId: string, amount: number) => void
    getTotalNutrition: () => void
}

export const useNutritionStore = create<Store>((set, get) => ({
    items: [],
    addFoodItem: (newItem: any) => set((state) => ({
        items: [...state.items, newItem]
    })),
    updateItemAmount: (itemId: string, amount: number) => set((state) => ({
        items: state.items.map(i => 
            i.id === itemId ? { ...i, amount: amount } : i
        )
    })),
    getTotalNutrition: () => {
        const {items} = get()

        const total = items.reduce((acc, item) => {
            return {
              calories: Math.round(acc.calories += item.calories * (item.amount / 100)),
              protein: Math.round(acc.protein += item.protein* (item.amount / 100)),
              fat: Math.round(acc.fat += item.fat* (item.amount / 100)),
              carbs: Math.round(acc.carbs += item.carbs* (item.amount / 100))
            }
          }, {calories: 0, protein: 0, fat: 0, carbs: 0})
          return total
    }
}));
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {useMemo} from 'react'
  import { foodItems } from "@/data";

export default function FoodItemsTable({tableItems, total}: any){
    
    const items = useMemo(() => {
        const itemsArr = tableItems.map((i: any) => {
            const itemData = foodItems.find(j => j.id === i.itemId)
            if(!itemData) return 

            return {
                name: i.item,
                calories: Math.round((i.amount / 100) * itemData.calories),
                protein: Math.round((i.amount / 100) * itemData.protein),
                fat: Math.round((i.amount / 100) * itemData.fat),
                carbs: Math.round((i.amount / 100) * itemData.carbs),
            }
        })
        return itemsArr
    }, [tableItems])

    if(!items?.length) return

    return (

        <Table>
            <TableHeader>
                <TableHead>Item</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Protein</TableHead>
                <TableHead>Fat</TableHead>
                <TableHead>Carbs</TableHead>
            </TableHeader>
            <TableBody>
                {items.map((i: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.calories}</TableCell>
                        <TableCell>{i.protein}</TableCell>
                        <TableCell>{i.fat}</TableCell>
                        <TableCell>{i.carbs}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>{total.calories}</TableCell>
                        <TableCell>{total.protein}</TableCell>
                        <TableCell>{total.fat}</TableCell>
                        <TableCell>{total.carbs}</TableCell>
                    </TableRow>
            </TableBody>
        </Table>
        
    )
}
'use client'

import { useAuth } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { BodyPart } from "@/types"
import { getBodyParts, updateBodyPart } from "@/actions"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { formatDate } from "date-fns"

export default function BodyPartInput({setParts, part, allParts}: {setParts: any, part: BodyPart, allParts: any}){
    const {userId} = useAuth()
    const [value, setValue] = useState('')

    const onUpdateBodyPart = async (bodyPart: BodyPart, value: number) => {
        if(!bodyPart || !value) return

        await updateBodyPart(userId!, bodyPart, value)
        const updatedParts = await getBodyParts(userId!)
        console.log(updatedParts)
        setParts(updatedParts.stats.bodyParts)
        setValue('')
    }

    return(
        <div className="">
    {allParts[part] && (
        <div>
            <Table>
                <TableHeader >
                    <TableRow>
                        {allParts[part]?.map((p: {date: Date, value: number, _id: string}) => (
                            <TableHead key={p._id}>{formatDate(p.date, 'PP')}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {allParts[part]?.map((p: {date: Date, value: number, _id: string}) => (
                            <TableCell key={p._id}>{p.value}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )}
    <Input className="w-20 mt-3" value={value} id={part} onChange={(e) => setValue(e.target.value)} />
    <Button onClick={() => onUpdateBodyPart(part, Number(value))} className="mt-3 ml-5">Add</Button>
</div>

    )
}
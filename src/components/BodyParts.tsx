'use client'

import { BodyPart } from "@/types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import BodyPartInput from "./BodyPartInput"
import { getBodyParts } from "@/actions"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"

const bodyParts: BodyPart[] = [ 'neck', 'rightBicep', 'leftBicep', 'rightForearm', 'leftForearm', 'chest', 'rightThigh', 'leftThigh', 'rightCalf', 'leftCalf']

export default function(){
    const [parts, setParts] = useState()
    const {userId} = useAuth()

    useEffect(() => {
        if(!userId) return
        getBodyParts(userId)
            .then(data => {
                console.log(data.stats.bodyParts)
                setParts(data.stats.bodyParts)
            })
            .catch(err => console.log(err))
    }, [userId])
    
    return (
        <Accordion type="single" collapsible>
            {bodyParts.map(part =>(
                <AccordionItem value={part} key={part}>
                    <AccordionTrigger>{part}</AccordionTrigger>
                    <AccordionContent>
                        <BodyPartInput part={part} allParts={parts} setParts={setParts}/>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
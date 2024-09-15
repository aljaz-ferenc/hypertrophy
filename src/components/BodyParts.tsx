import { BodyPart } from "@/types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const bodyParts: BodyPart[] = [ 'neck', 'rightBicep', 'leftBicep', 'rightForearm', 'leftForearm', 'chest', 'rightThigh', 'leftThigh', 'rightCalf', 'leftCalf']

export default function(){
    return (
        <Accordion type="single" collapsible>
            {bodyParts.map(part =>(
                <AccordionItem value={part}>
                    <AccordionTrigger>{part}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex gap-2 items-center">
                            <Input className="w-20" id={part}/>mm
                            <Button className="ml-5">Add</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
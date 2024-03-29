import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mesocycle as MesocycleType } from "@/types";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button } from "./ui/button";
import Mesocycle from "./Mesocycle";
import React, { useState } from "react";
import { Ellipsis } from "lucide-react";

type MesocycleAccordionProps = {
  mesocycles: MesocycleType[];
  handleDeleteMesocycle: (mesoId: string) => void;
  handleTryActivate: (meso: MesocycleType) => void;
  activateMesocycle: (meso: MesocycleType) => void;
  dialogIsOpen: boolean;
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActivating: boolean;
};

export default function MesocycleAccordion({
  mesocycles,
  handleDeleteMesocycle,
  handleTryActivate,
  activateMesocycle,
  dialogIsOpen,
  setDialogIsOpen,
  isActivating,
}: MesocycleAccordionProps) {
  const [selectedMeso, setSelectedMeso] = useState<MesocycleType>();
  return (
    <>
      <Accordion type="single" collapsible className="w-full mx-auto">
        {mesocycles.map((meso) => (
          <AccordionItem
            className="w-full max-w-full"
            key={meso._id}
            value={meso._id!}
            onClick={() => setSelectedMeso(meso)}
          >
            <AccordionTrigger>
              <div className="flex w-full gap-2">
                {meso.title}
                {meso.isActive ? (
                  <p className="italic text-green-600">(Active)</p>
                ) : null}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="ml-auto mr-3">
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleTryActivate(meso)}>
                     {/* <Button
                        className="w-full"
                        disabled={isActivating}
                        onClick={() => handleTryActivate(meso)}
                      >
                        Activate
                      </Button>  */}
                      Activate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteMesocycle(meso._id!)}>
                      {/* <Button
                        className="w-full"
                        onClick={() => handleDeleteMesocycle(meso._id!)}
                        variant={"destructive"}
                      >
                        Delete
                      </Button>  */}
                      <span className='text-destructive'>
                      Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> 
            </AccordionTrigger>
            <AccordionContent>
              <Mesocycle workouts={meso.workouts} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Dialog
        open={dialogIsOpen}
        onOpenChange={(e) => !e && setDialogIsOpen(e)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Another mesocycle is already active</DialogTitle>
            <DialogDescription>
              If you activate this mesocycle, data from the currently active
              mesocycle will be lost.
            </DialogDescription>
            <DialogDescription>Do you wish to continue?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <Button onClick={() => activateMesocycle(selectedMeso!)}>
              Activate
            </Button>
            <Button variant={'destructive'} onClick={() => setDialogIsOpen(false)}>Cancel</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

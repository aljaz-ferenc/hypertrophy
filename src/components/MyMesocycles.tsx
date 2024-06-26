"use client";

import * as actions from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Mesocycle as MesocycleType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import MesocycleAccordion from "@/components/MesocycleAccordion";
import { useRouter } from "next/navigation";
import CenteredText from "@/components/CenteredText";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function MyMesocycles() {
    const { userId } = useAuth();
    const [mesocycles, setMesocycles] = useState<MesocycleType[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    useEffect(() => {
        if (!userId) return;
        getMesocycles(userId);
      }, [userId]);
    
      function getMesocycles(userId: string) {
        setIsFetching(true)
        actions.getMesocyclesByUserId(userId).then((data) => {
          setMesocycles(data);
          setIsFetching(false);
          setIsActivating(false);
        });
      }
    
      if (!userId) return;
    
      if (isFetching) {
        return <Loading/>
      }
    
      function handleTryActivate(meso: MesocycleType) {
        if (mesocycles.some((meso) => meso.isActive === true)) {
          setDialogIsOpen(true);
        } else {
          activateMesocycle(meso);
        }
      }
    
      async function activateMesocycle(mesocycle: MesocycleType) {
    
        const meso = mesocycles.find((m) => m._id === mesocycle._id);
        if (!meso) return;
        setIsActivating(true);
        try {
          await actions.activateMesocycle(meso!, userId!);
          toast({
            title: `Mesocycle activated!`,
            description: `${meso.title}`,
          });
          router.push('/app/todays-workout')
        } catch (err: unknown) {
          console.log(err);
        }
        getMesocycles(userId!);
        setDialogIsOpen(false);
      }
    
      async function handleDeleteMesocycle(mesoId: string) {
        if (!mesoId) return;
        const meso = mesocycles.find((m) => m._id === mesoId);
        if (!meso) return;
    
        try {
          await actions.deleteMesocycle(mesoId);
          toast({
            title: "Mesocycle deleted",
            description: meso.title,
          });
          actions
            .getMesocyclesByUserId(userId!)
            .then((data) => setMesocycles(data));
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log(err.message);
          }
        }
      }
  return (
    <>
      {!isFetching && mesocycles.length > 0 ? (
        <>
          <MesocycleAccordion
            isActivating={isActivating}
            handleDeleteMesocycle={handleDeleteMesocycle}
            handleTryActivate={handleTryActivate}
            activateMesocycle={activateMesocycle}
            setDialogIsOpen={setDialogIsOpen}
            dialogIsOpen={dialogIsOpen}
            mesocycles={mesocycles}
          />
        </>
      ) : (
        <CenteredText>
          <p>
            You have not created any mesocycles yet.{" "}
            <Link href={"/app/create-mesocycle"} className="link">
              Create one here.
            </Link>
          </p>
        </CenteredText>
      )}
    </>
  );
}

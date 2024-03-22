import { Accordion } from '@/components/ui/accordion'
import * as actions from '@/actions'

type MesocyclesPreviewProps = {
    clerkId: string
}

export default async function MesocyclesPreview({clerkId}: MesocyclesPreviewProps) {

    const mesocycles = await  actions.getMesocyclesByUserId(clerkId)
    console.log(mesocycles)

  return (
    <div>
        <Accordion type='single'>
            <></>
        </Accordion>
    </div>
  )
}

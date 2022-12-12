import { BicycleEnd, BicycleStart } from '@/components/Icons'
import * as ProgressPrimitive from '@radix-ui/react-progress'

export default function BicycleProgress({ progress }: { progress: number }) {
  return (
    <div className="flex w-full">
      <BicycleStart className="h-8 w-8 translate-x-[2px] translate-y-[0.7px]" />
      <ProgressPrimitive.Root className="w-[calc(100%-4rem)]" value={progress}>
        <ProgressPrimitive.Indicator
          className="relative mt-2 flex h-2 rounded-b-sm bg-mobility transition-all"
          style={{ width: `${progress}%` }}
        >
          <BicycleEnd className="absolute top-0 -right-8 h-8 w-8 -translate-y-[7.5px] -translate-x-[5px]" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
}

import { BicycleEnd, BicycleStart } from '@/components/Icons'
import * as ProgressPrimitive from '@radix-ui/react-progress'

export default function BicycleProgress({ progress }: { progress: number }) {
  return (
    <div className="flex w-full">
      <BicycleStart className="h-12 translate-x-1 -translate-y-[3px]" />
      <ProgressPrimitive.Root className="w-[calc(100%-4rem)]" value={progress}>
        <ProgressPrimitive.Indicator
          className="relative mt-2 flex h-3 bg-mobility transition-all"
          style={{ width: `${progress}%` }}
        >
          <BicycleEnd className="absolute top-0 -right-8 h-12 -translate-y-[11.3px] translate-x-0" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
}

import { BicycleEnd, BicycleStart } from '@/components/Icons'

export default function BicycleProgress({ progress }: { progress: number }) {
  return (
    <div className="flex w-full">
      <div className="h-8 w-8">
        <BicycleStart />
      </div>
      <div className="flex flex-1 -translate-x-[4px]">
        <div
          className={
            'mt-2 h-2 -translate-y-[1px] rounded-b-sm bg-mobility transition-all'
          }
          style={{ width: `${progress}%` }}
        ></div>
        <div className="h-8 w-8">
          <BicycleEnd />
        </div>
      </div>
    </div>
  )
}

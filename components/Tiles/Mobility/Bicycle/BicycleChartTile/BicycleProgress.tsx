import { BicycleEnd, BicycleStart } from '@/components/Icons'

export default function BicycleProgress({ progress }: { progress: number }) {
  return (
    <div className="flex w-full">
      <div className="w-8 translate-x-[4px]">
        <BicycleStart />
      </div>
      <div className="flex flex-1">
        <div
          className={
            'mt-2 h-2 -translate-y-[1px] rounded-b-sm bg-mobility transition-all'
          }
          style={{ width: `${progress}%` }}
        ></div>
        <div className="w-8 -translate-x-[1px]">
          <BicycleEnd />
        </div>
      </div>
    </div>
  )
}

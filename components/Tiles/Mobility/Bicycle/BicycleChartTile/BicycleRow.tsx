import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import BicycleProgress from './BicycleProgress'

type BicycleRowProps = {
  name: string
  count: number
  min: number
  max: number
}

function mapBetween(
  currentNum: number,
  min: number,
  max: number,
  minAllowed = 0,
  maxAllowed = 100,
) {
  return (
    ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
  )
}

export default function BicycleRow({ name, count, min, max }: BicycleRowProps) {
  const progress = mapBetween(count, min * 0.9, max * 1.1)

  return (
    <div className="my-2 flex w-full items-center">
      <div className="w-28 flex-none md:w-40">
        <p className="text-sm text-primary md:text-base">{name}</p>
        <AnimatedNumber className="text-lg text-mobility md:text-3xl">
          {count}
        </AnimatedNumber>
      </div>
      <div className="flex-1">
        <BicycleProgress progress={progress} />
      </div>
    </div>
  )
}

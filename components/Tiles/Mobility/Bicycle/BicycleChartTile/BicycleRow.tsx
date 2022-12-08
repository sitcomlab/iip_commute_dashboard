import { animated, useSpring } from 'react-spring'
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

  const props = useSpring({ to: { val: count }, config: { duration: 100 } })

  return (
    <div className="my-2 flex w-full items-center">
      <div className="w-40 flex-none">
        <p className="text-primary">{name}</p>
        <animated.p className="text-3xl text-mobility">
          {props.val.to(e =>
            e.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
          )}
        </animated.p>
      </div>
      <div className="flex-1">
        <BicycleProgress progress={progress} />
      </div>
    </div>
  )
}

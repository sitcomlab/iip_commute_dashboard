import { BeakerIcon, CloudIcon, SunIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Duration } from 'date-fns'
import { animated, useSpring } from 'react-spring'

type PhenomenaType = {
  [key: string]: {
    title: string
    unit: string
    icon: any // TODO: change any
    decimals?: number
  }
}

const phenomena: PhenomenaType = {
  temperature: {
    title: 'Temperatur',
    unit: '°C',
    icon: BeakerIcon,
    decimals: 1,
  },
  precipitation: {
    title: 'Niederschlag',
    unit: 'mm',
    icon: BeakerIcon,
  },
  cloudcover: {
    title: 'Wolkenbedeckung',
    unit: '%',
    icon: CloudIcon,
  },
  windspeed: {
    title: 'Windgeschwindigkeit',
    unit: 'km/h',
    icon: BeakerIcon,
    decimals: 1,
  },
  sunhours: {
    title: 'Sonnenstunden',
    unit: 'h',
    icon: SunIcon,
  },
}

const sizes = {
  md: 'text-2xl',
  xl: 'text-5xl',
}

type PhenomenonProps = {
  phenomenon: keyof typeof phenomena
  value: number | Duration
  size?: keyof typeof sizes
}

export default function Phenomenon({
  phenomenon,
  value,
  size = 'md',
}: PhenomenonProps) {
  const { title, unit, icon, decimals } = phenomena[phenomenon]

  const props = useSpring({ val: value, from: { val: 0 } })

  const Icon = icon
  return (
    <div className="my-2 flex items-center space-x-2">
      <Icon className="h-8 text-sky-500" />
      <div>
        <p className="text-sm font-semibold text-primary-500">{title}</p>
        <span className={clsx('text-sky-500', sizes[size])}>
          <>
            <animated.span>
              {props.val.to(val => val.toFixed(decimals || 0))}
            </animated.span>{' '}
            {unit}
          </>
        </span>
      </div>
    </div>
  )
}

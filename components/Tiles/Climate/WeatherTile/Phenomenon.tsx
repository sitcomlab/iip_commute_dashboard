import { BeakerIcon, CloudIcon, SunIcon } from '@heroicons/react/24/outline'
import { Duration } from 'date-fns'
import { animated, useSpring } from 'react-spring'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

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

const phenomenonStyle = cva('text-climate', {
  variants: {
    size: {
      md: 'text-2xl',
      xl: 'text-5xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type PhenomenonProps = VariantProps<typeof phenomenonStyle> & {
  phenomenon: keyof typeof phenomena
  value: number | Duration
}

export default function Phenomenon({
  phenomenon,
  value,
  size = 'md',
}: PhenomenonProps) {
  const { title, unit, icon, decimals } = phenomena[phenomenon]

  const props = useSpring({ val: value, config: { duration: 100 } })

  const Icon = icon
  return (
    <div className="my-2 flex items-center space-x-2">
      <Icon className="h-8 text-climate" />
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <span className={phenomenonStyle({ size })}>
          <>
            <animated.span>
              {/* @ts-ignore */}
              {props.val.to(val => val.toFixed(decimals || 0))}
            </animated.span>{' '}
            {unit}
          </>
        </span>
      </div>
    </div>
  )
}

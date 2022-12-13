import { CloudIcon } from '@heroicons/react/24/outline'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Sun, Temperature, Water, Wind } from '@/components/Icons'
import { SVGProps } from 'react'
import AnimatedNumber from '@/components/Elements/AnimatedNumber'

type PhenomenaType = {
  [key: string]: {
    title: string
    unit: string
    icon: (_props: SVGProps<SVGSVGElement>) => JSX.Element
    decimals?: number
  }
}

const phenomena: PhenomenaType = {
  temperature: {
    title: 'Temperatur',
    unit: '°C',
    icon: Temperature,
    decimals: 1,
  },
  precipitation: {
    title: 'Niederschlag',
    unit: 'mm',
    icon: Water,
  },
  cloudcover: {
    title: 'Wolken&shy;bedeckung',
    unit: '%',
    icon: CloudIcon,
  },
  windspeed: {
    title: 'Wind&shy;geschwindigkeit',
    unit: 'km/h',
    icon: Wind,
    decimals: 1,
  },
  sunhours: {
    title: 'Sonnenstunden',
    unit: 'h',
    icon: Sun,
  },
}

const phenomenonStyle = cva('text-climate', {
  variants: {
    size: {
      md: 'text-lg md:text-2xl',
      xl: 'text-2xl md:text-5xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type PhenomenonProps = VariantProps<typeof phenomenonStyle> & {
  phenomenon: keyof typeof phenomena
  value: number
}

export default function Phenomenon({
  phenomenon,
  value,
  size = 'md',
}: PhenomenonProps) {
  const { title, unit, icon, decimals } = phenomena[phenomenon]

  const Icon = icon
  return (
    <div className="my-2 flex items-center space-x-2">
      <Icon className="h-10 w-8 text-primary" />
      <div>
        <p
          className="text-sm font-semibold text-primary"
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        <span className={phenomenonStyle({ size })}>
          <>
            <AnimatedNumber decimals={decimals}>{value}</AnimatedNumber> {unit}
          </>
        </span>
      </div>
    </div>
  )
}

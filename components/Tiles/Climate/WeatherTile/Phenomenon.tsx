import { Cloud, Sun, Temperature, Water, Wind } from '@/components/Icons'
import { ForwardRefExoticComponent, SVGProps } from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'

type PhenomenaType = {
  [key: string]: {
    title: string
    unit: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
      | React.ForwardRefExoticComponent<
          Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
            title?: string | undefined
            titleId?: string | undefined
          } & React.RefAttributes<SVGSVGElement>
        >
    decimals?: number
  }
}

const phenomena: PhenomenaType = {
  temperature: {
    title: 'Temperatur',
    unit: '°C',
    icon: Temperature,
    decimals: 0,
  },
  precipitation: {
    title: 'Niederschlag',
    unit: 'mm',
    icon: Water,
  },
  cloudcover: {
    title: 'Wolken&shy;bedeckung',
    unit: '%',
    icon: Cloud,
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

type PhenomenonProps = {
  phenomenon: keyof typeof phenomena
  value: number
  size?: 'md' | 'xl'
}

export default function Phenomenon({
  phenomenon,
  value,
  size = 'md',
}: PhenomenonProps) {
  const { title, unit, icon, decimals } = phenomena[phenomenon]

  const valueSize: 'h1' | 'h3' = size === 'xl' ? 'h1' : 'h3'

  const Icon = icon
  return (
    <div className="my-2 flex items-center gap-3">
      <Icon
        className={cx(
          size === 'md' ? 'aspect-square' : 'w-6',
          'h-14 text-primary',
        )}
      />
      <div>
        <Title
          as={'h5'}
          dangerouslySetInnerHTML={{ __html: title }}
          variant={'primary'}
        ></Title>
        <Title as={valueSize} variant="climate">
          <AnimatedNumber decimals={decimals}>{value}</AnimatedNumber> {unit}
        </Title>
      </div>
    </div>
  )
}

import { cva, cx, VariantProps } from 'class-variance-authority'
import Title from '../Elements/Title'
import { BicycleIcon, BuildingIcon, EnergyIcon, MuensterIcon } from '../Icons'

const sectionHeaderStyle = cva('', {
  variants: {
    variant: {
      climate: 'text-climate border-climate',
      mobility: 'text-mobility border-mobility',
      building: 'text-buildings border-buildings',
      energy: 'text-energy border-energy',
    },
  },
})

export default function SectionTitle({
  variant,
  large,
}: VariantProps<typeof sectionHeaderStyle> & {
  large?: boolean
}) {
  let title = 'Münster'
  let Icon = MuensterIcon

  if (variant === 'climate') {
    title = 'Klima in Münster'
  }
  if (variant === 'mobility') {
    title = 'Mobilität'
    Icon = BicycleIcon
  }
  if (variant === 'building') {
    title = 'Gebäude'
    Icon = BuildingIcon
  }
  if (variant === 'energy') {
    title = 'Energie'
    Icon = EnergyIcon
  }

  return (
    <div className="flex items-center space-x-4">
      <div
        className={cx(
          'h-14 w-20 rounded-full border-2 p-2',
          sectionHeaderStyle({ variant }),
        )}
      >
        <Icon className="mx-auto h-full" />
      </div>
      <Title as={large ? 'h2' : 'h4'} variant={'primary'}>
        {title}
      </Title>
    </div>
  )
}

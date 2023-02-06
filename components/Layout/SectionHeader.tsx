import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { cva, cx, VariantProps } from 'class-variance-authority'
import Collapsible from '../Elements/Collapsible'
import Title from '../Elements/Title'
import { BicycleIcon, BuildingIcon, MuensterIcon } from '../Icons'

const sectionHeaderStyle = cva('', {
  variants: {
    variant: {
      climate: 'text-climate border-climate',
      mobility: 'text-mobility border-mobility',
      building: 'text-buildings border-buildings',
    },
  },
})

export default function SectionHeader({
  variant,
}: VariantProps<typeof sectionHeaderStyle>) {
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

  return (
    <div className="my-4 flex w-full items-center justify-between">
      <div className="flex items-center space-x-4">
        <div
          className={cx(
            'h-14 w-20 rounded-full border-2 p-2',
            sectionHeaderStyle({ variant }),
          )}
        >
          <Icon className="mx-auto h-full" />
        </div>
        <Title>{title}</Title>
      </div>
      <Collapsible
        trigger={
          <div className="flex items-center space-x-2 text-primary">
            <ArrowsUpDownIcon className="h-4 w-4" />

            <span className="underline underline-offset-2">
              Kacheln sortieren
            </span>
          </div>
        }
      >
        <div>Hello World</div>
      </Collapsible>
    </div>
  )
}

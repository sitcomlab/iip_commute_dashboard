import { cva, cx, VariantProps } from 'class-variance-authority'
import Title from '../Elements/Title'
import { BicycleIcon, BuildingIcon, EnergyIcon, MuensterIcon } from '../Icons'
import { SVGProps } from 'react'

const sectionHeaderStyle = cva('', {
  variants: {
    variant: {
      climate: 'text-climate border-climate',
      mobility: 'text-mobility border-mobility',
      building: 'text-buildings border-buildings',
      energy: 'text-energy border-energy',
      impressum: 'text-white',
      datenschutz: 'text-white',

      münster: 'text-mobility border-mobility',
      osnabrück: 'text-mobility border-mobility',
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
  let Icon: ((_: SVGProps<SVGSVGElement>) => JSX.Element) | undefined =
    MuensterIcon

  if (variant === 'münster') {
    title = 'Münster'
  }
  if (variant === 'mobility') {
    title = 'Mobilität'
    Icon = BicycleIcon
  }
  if (variant === 'osnabrück') {
    title = 'Osnabrück'
    //Icon = BuildingIcon
  }

  return (
    <div className="flex items-center space-x-4">
      {Icon && (
        <div
          className={cx(
            'h-14 w-20 rounded-full border-2 p-2',
            sectionHeaderStyle({ variant }),
          )}
        >
          <Icon className="mx-auto h-full" />
        </div>
      )}
      <Title
        as={large ? 'h2' : 'h4'}
        variant={
          ['impressum', 'datenschutz'].includes(variant!)
            ? 'inverse'
            : 'primary'
        }
      >
        {title}
      </Title>
    </div>
  )
}

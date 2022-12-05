import { cva, cx, VariantProps } from 'class-variance-authority'
import TileFooter from './TileFooter'

const baseTileStyle = cva('flex h-fit overflow-hidden rounded-3xl', {
  variants: {
    variant: {
      primary: 'bg-primary-100',
      mobility: 'bg-green-100',
      successStory: 'bg-primary-100',
      climate: 'bg-sky-100',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type ImageProps =
  | { startImage: React.ReactElement; endImage?: never }
  | { endImage: React.ReactElement; startImage?: never }
  | { endImage?: undefined; startImage?: undefined }

export type BaseTileProps = VariantProps<typeof baseTileStyle> & {
  children: React.ReactElement | React.ReactElement[]
  className?: string
  footerCenterElement?: React.ReactElement
} & ImageProps

/**
 * A basic configruable tile
 * @param BaseTileProps basic properties of the tile
 * @returns BaseTile
 */
export function BaseTile({
  children,
  variant,
  className = '',
  startImage,
  endImage,
  footerCenterElement,
}: BaseTileProps) {
  return (
    <div className="pb-4 md:pb-8">
      <div className={cx(baseTileStyle({ variant }), className)}>
        {startImage}
        <div className="flex w-full flex-col justify-between p-8 md:p-12">
          <div>{children}</div>
          <TileFooter>{footerCenterElement}</TileFooter>
        </div>
        {endImage}
      </div>
    </div>
  )
}

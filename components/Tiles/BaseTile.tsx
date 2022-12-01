import clsx from 'clsx'
import TileFooter from './TileFooter'

const variants = {
  primary: 'bg-primary-100 rounded-3xl',
  mobility: 'bg-green-100 rounded-3xl',
  successStory: 'bg-secondary rounded-lg',
  climate: 'bg-sky-100 rounded-3xl',
}

export type ImageProps =
  | { startImage: React.ReactElement; endImage?: never }
  | { endImage: React.ReactElement; startImage?: never }
  | { endImage?: undefined; startImage?: undefined }

export type BaseTileProps = {
  children: React.ReactElement | React.ReactElement[]
  variant?: keyof typeof variants
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
  variant = 'primary',
  className = '',
  startImage,
  endImage,
  footerCenterElement,
}: BaseTileProps) {
  return (
    <div className="pb-8">
      <div
        className={clsx(
          'flex h-fit overflow-hidden',
          variants[variant],
          className,
        )}
      >
        {startImage}
        <div className="flex w-full flex-col justify-between p-12">
          <div>{children}</div>
          <TileFooter
            variant={variant === 'successStory' ? 'inverse' : 'primary'}
          >
            {footerCenterElement}
          </TileFooter>
        </div>
        {endImage}
      </div>
    </div>
  )
}

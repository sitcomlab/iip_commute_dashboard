'use client'

import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useTransition } from 'react-spring'
import EmbedOverlay from './EmbedOverlay'
import TileFooter from './TileFooter'

const baseTileStyle = cva('relative flex h-fit overflow-hidden rounded-3xl', {
  variants: {
    variant: {
      primary: 'bg-primary-light',
      mobility: 'bg-mobility-light',
      successStory: 'bg-primary-light',
      climate: 'bg-climate-light',
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
  const [showOverlay, setShowOverlay] = useState(false)

  const transitions = useTransition(showOverlay, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div className="pb-4 md:pb-8">
      <div className={cx(baseTileStyle({ variant }), className)}>
        {startImage}
        <div className="flex w-full flex-col justify-between p-6 md:p-12">
          <div>{children}</div>
          <TileFooter onEmbedClick={() => setShowOverlay(true)}>
            {footerCenterElement}
          </TileFooter>
        </div>
        {endImage}
        {transitions(
          (styles, render) =>
            render && (
              <EmbedOverlay
                onClose={() => setShowOverlay(false)}
                style={styles}
              />
            ),
        )}
      </div>
    </div>
  )
}

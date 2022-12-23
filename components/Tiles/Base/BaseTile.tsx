'use client'

import embedRegistry from '@/utils/embedRegistry'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useTransition } from 'react-spring'
import EmbedOverlay from './EmbedOverlay'
import ShareOverlay from './ShareOverlay'
import TileFooter from './TileFooter'

const baseTileStyle = cva(
  'relative flex flex-col md:flex-row h-fit overflow-hidden rounded-3xl',
  {
    variants: {
      variant: {
        primary: 'bg-primary-light',
        secondary: 'bg-secondary',
        mobility: 'bg-mobility-light',
        successStory: 'bg-primary-light',
        climate: 'bg-climate-light',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export type ImageProps =
  | { startImage: React.ReactElement; endImage?: never }
  | { endImage: React.ReactElement; startImage?: never }
  | { endImage?: undefined; startImage?: undefined }

export type EmbedTileProps = { embedId?: keyof typeof embedRegistry }

export type BaseTileProps = VariantProps<typeof baseTileStyle> &
  EmbedTileProps &
  ImageProps & {
    children: React.ReactElement | React.ReactElement[]
    className?: string
    footerCenterElement?: React.ReactElement
  }

const transitionOpts = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

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
  embedId,
}: BaseTileProps) {
  const [showEmbedOverlay, setShowEmbedOverlay] = useState(false)
  const [showShareOverlay, setShowShareOverlay] = useState(false)

  const embedTransitions = useTransition(showEmbedOverlay, transitionOpts)
  const shareTransitions = useTransition(showShareOverlay, transitionOpts)

  const openShareDialog = async () => {
    if (navigator && navigator.share) {
      try {
        await navigator.share({
          title: 'Klimadashboard Münster',
          url: `${window.location.origin}/share/${embedId}`,
        })
      } catch (e) {
        console.log('Could not share', e)
      } finally {
        return
      }
    }

    setShowShareOverlay(true)
  }

  return (
    <div className="pb-4 md:pb-8">
      <div className={cx(baseTileStyle({ variant }), className)}>
        {startImage}
        <div className="flex w-full flex-col justify-between p-6 md:p-12">
          <div>{children}</div>
          <TileFooter
            onEmbedClick={() => setShowEmbedOverlay(true)}
            onShareClick={openShareDialog}
            variant={variant === 'secondary' ? 'inverse' : 'primary'}
          >
            {footerCenterElement}
          </TileFooter>
        </div>
        {endImage}
        {embedId &&
          embedTransitions(
            (styles, render) =>
              render && (
                <EmbedOverlay
                  embedId={embedId}
                  onClose={() => setShowEmbedOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {embedId &&
          shareTransitions(
            (styles, render) =>
              render && (
                <ShareOverlay
                  embedId={embedId}
                  onClose={() => setShowShareOverlay(false)}
                  style={styles}
                />
              ),
          )}
      </div>
    </div>
  )
}

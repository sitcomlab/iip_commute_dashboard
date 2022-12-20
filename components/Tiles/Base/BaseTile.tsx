'use client'

import embedRegistry from '@/utils/embedRegistry'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useTransition } from 'react-spring'
import EmbedOverlay from './EmbedOverlay'
import TileFooter from './TileFooter'
import 'share-api-polyfill'

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
  const [showOverlay, setShowOverlay] = useState(false)

  const transitions = useTransition(showOverlay, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const openShareDialog = async () => {
    try {
      await navigator.share(
        {
          title: 'Web Share API Polyfill',
          text: 'A polyfill for the Share API. Use it to share in both desktops and mobile devices.',
          url: `${window.location.origin}/share/${embedId}`,
        },
        // @ts-ignore
        {
          language: 'de',
          copy: true,
          email: true,
          print: false,
          sms: false,
          messenger: false,
          facebook: false,
          whatsapp: false,
          twitter: false,
          linkedin: false,
          telegram: false,
          skype: false,
          pinterest: false,
          line: false,
        },
      )
    } catch (e) {
      console.log('Could not share', e)
    }
  }

  return (
    <div className="pb-4 md:pb-8">
      <div className={cx(baseTileStyle({ variant }), className)}>
        {startImage}
        <div className="flex w-full flex-col justify-between p-6 md:p-12">
          <div>{children}</div>
          <TileFooter
            onEmbedClick={() => setShowOverlay(true)}
            onShareClick={openShareDialog}
            variant={variant === 'secondary' ? 'inverse' : 'primary'}
          >
            {footerCenterElement}
          </TileFooter>
        </div>
        {endImage}
        {embedId &&
          transitions(
            (styles, render) =>
              render && (
                <EmbedOverlay
                  embedId={embedId}
                  onClose={() => setShowOverlay(false)}
                  style={styles}
                />
              ),
          )}
      </div>
    </div>
  )
}

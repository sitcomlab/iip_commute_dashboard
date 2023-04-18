'use client'

import AnimatedCopyIcon from '@/components/Elements/Animated/AnimatedCopyIcon'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from 'react-spring'
import BaseOverlay from './BaseOverlay'
import { TileType } from '@/utils/TileFactory'

type EmbedOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  embedId: TileType
}

export default function EmbedOverlay({
  onClose,
  embedId,
  ...props
}: EmbedOverlayProps) {
  const link = `${window.location.origin}/embed/${embedId}`

  const iframeSrc = `<iframe src="${link}" style="border:none; width:100%; height:100%" title="Klimadashboard Münster"></iframe>`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(iframeSrc)
  }

  return (
    <BaseOverlay onClose={onClose} {...props}>
      <div className="flex h-full w-full flex-1 flex-col items-center">
        <Title variant={'secondary'}>
          Diese Kachel auf Ihre Website einbauen
        </Title>
        <Spacer size={'sm'} />{' '}
        <div className="flex rounded bg-white p-4">
          <pre className="m-4 flex-1 whitespace-pre-wrap break-all text-sm">
            {iframeSrc}
          </pre>
          <div className="relative w-7">
            <AnimatedCopyIcon onClick={copyToClipboard} />
          </div>
        </div>
        <Spacer size={'sm'} />
        <p className="text-white">
          Sie möchten diese Kachel auch auf ihrer Website darstellen? Nutzen Sie
          den iframe Code und betten Sie diesen in ihrer Website ganz einfach
          ein.
        </p>
      </div>
    </BaseOverlay>
  )
}

'use client'

import AnimatedCopyIcon from '@/components/Elements/Animated/AnimatedCopyIcon'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import embedRegistry from '@/utils/embedRegistry'
import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from 'react-spring'
import BaseOverlay from './BaseOverlay'

type ShareOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  embedId: keyof typeof embedRegistry
}

export default function ShareOverlay({
  onClose,
  embedId,
  ...props
}: ShareOverlayProps) {
  const link = `${window.location.origin}/share/${embedId}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link)
  }

  return (
    <BaseOverlay onClose={onClose} {...props}>
      <div className="flex h-full w-full flex-col items-center">
        <Title variant={'secondary'}>Diese Kachel teilen</Title>
        <Spacer />
        <div className="flex w-full rounded bg-white p-4">
          <pre className="m-4 flex-1 whitespace-pre-wrap break-all text-sm">
            {link}
          </pre>
          <div className="relative w-7">
            <AnimatedCopyIcon onClick={copyToClipboard} />
          </div>
        </div>
      </div>
    </BaseOverlay>
  )
}

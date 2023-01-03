'use client'

import embedRegistry from '../../../utils/embedRegistry'
import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from 'react-spring'
import React from 'react'
import BaseOverlay from './BaseOverlay'

type MoreInfoOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  embedId: keyof typeof embedRegistry
  // children?: React.ReactNode | React.ReactNode[]
}

export default function MoreInfoOverlay({
  onClose,
  // embedId,
  // children,
  ...props
}: MoreInfoOverlayProps) {
  return (
    <BaseOverlay onClose={onClose} {...props}>
      <div></div>
    </BaseOverlay>
  )
}

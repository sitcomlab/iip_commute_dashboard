'use client'

import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from 'react-spring'
import React from 'react'
import BaseOverlay from './BaseOverlay'

type MoreInfoOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  children?: React.ReactNode | React.ReactNode[]
}

export default function MoreInfoOverlay({
  onClose,
  children,
  ...props
}: MoreInfoOverlayProps) {
  return (
    <BaseOverlay onClose={onClose} {...props}>
      {children}
    </BaseOverlay>
  )
}

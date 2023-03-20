'use client'

import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from 'react-spring'
import React from 'react'
import BaseOverlay from './BaseOverlay'
import Title from '@/components/Elements/Title'

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
      <Title as="h6" variant={'inverse'}>
        {children}
      </Title>
    </BaseOverlay>
  )
}

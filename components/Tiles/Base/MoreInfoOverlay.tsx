'use client'

import embedRegistry from '../../../utils/embedRegistry'
import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from 'react-spring'
import React from 'react'
import BaseOverlay from './BaseOverlay'

type MoreInfoOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  embedId: keyof typeof embedRegistry
}

export default function MoreInfoOverlay({
  onClose,
  embedId,
  ...props
}: MoreInfoOverlayProps) {
  //   const transitions = useTransition(success, {
  //     from: { opacity: 0 },
  //     enter: { opacity: 1 },
  //     leave: { opacity: 0 },
  //   })

  return (
    <BaseOverlay onClose={onClose} {...props}>
      {embedId === 'extremwetter' && (
        <div className="mb-8 flex space-x-4">
          <div className="flex flex-1 flex-col justify-between">
            <p>Slideshow</p>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <p>
              Hier steht eine Überschrift zum jeweilig dargestellten
              Extremwetterereignis
            </p>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugait nulla
              facilisi. Lorem ipsum dolor sit amet,
            </p>
          </div>
        </div>
      )}
    </BaseOverlay>
  )
}

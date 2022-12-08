'use client'

import Title from '@/components/Elements/Title'
import {
  CheckIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ComponentPropsWithRef, useEffect, useState } from 'react'
import { animated, AnimatedProps, useTransition } from 'react-spring'

type EmbedOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
}

export default function EmbedOverlay({ onClose, ...props }: EmbedOverlayProps) {
  const link = `${window.location.origin}/embed/123`

  const iframeSrc = `<iframe src="${link}" style="border:none; width:100%; height:100%" title="Klimadashboard Münster"></iframe>`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(iframeSrc)
    setSuccess(true)
  }

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) {
      return
    }

    setTimeout(() => setSuccess(false), 2000)
  }, [success])

  const transitions = useTransition(success, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <animated.div
      {...props}
      className="absolute top-0 left-0 h-full w-full bg-primary bg-opacity-90 p-8 backdrop-blur md:p-12"
    >
      <div className="flex w-full justify-end">
        <XMarkIcon
          className="h-6 cursor-pointer text-white"
          onClick={onClose}
        />
      </div>
      <div className="my-auto flex w-full items-center">
        <div className="flex-1">
          <Title variant={'secondary'}>
            Klimakachel auf Ihre Website einbauen
          </Title>
          <div className="flex rounded bg-white p-4">
            <pre className="m-4 flex-1 whitespace-pre-wrap">{iframeSrc}</pre>
            <div className="relative w-7">
              {transitions((styles, isSuccess) => (
                <animated.div
                  className="absolute top-0 cursor-pointer rounded-full bg-transparent p-2 hover:bg-zinc-100"
                  onClick={copyToClipboard}
                  style={styles}
                >
                  {isSuccess ? (
                    <CheckIcon className="w-5 stroke-2 text-secondary" />
                  ) : (
                    <ClipboardDocumentIcon className="w-5 stroke-2 text-primary" />
                  )}
                </animated.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

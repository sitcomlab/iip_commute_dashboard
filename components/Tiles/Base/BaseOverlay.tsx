import { XMarkIcon } from '@heroicons/react/24/outline'
import { ComponentPropsWithRef } from 'react'
import { animated, AnimatedProps } from 'react-spring'

type BaseOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  children: React.ReactNode | React.ReactNode[]
  onClose?: () => void
}

export default function BaseOverlay({
  children,
  onClose,
  ...props
}: BaseOverlayProps) {
  return (
    <animated.div
      {...props}
      className="absolute top-0 left-0 z-20 h-full w-full bg-primary bg-opacity-90 p-8 backdrop-blur md:p-12"
    >
      <div className="flex w-full justify-end">
        <XMarkIcon
          className="h-6 cursor-pointer text-white"
          onClick={onClose}
        />
      </div>
      {children}
    </animated.div>
  )
}

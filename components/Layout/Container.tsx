import { cx } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

export type ContainerProps = HTMLAttributes<HTMLDivElement>

export default function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cx(
        'container mx-auto px-2 py-4 md:px-[82px] md:py-10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

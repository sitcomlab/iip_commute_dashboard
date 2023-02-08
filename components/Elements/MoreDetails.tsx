import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'
import Title from './Title'

const style = cva('flex cursor-pointer items-center space-x-1', {
  variants: {
    variant: {
      primary: 'text-primary',
      inverse: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type MoreDetailsProps = VariantProps<typeof style> & {
  link?: string
  className?: string
}

export default function MoreDetails({
  link,
  variant,
  className,
}: MoreDetailsProps) {
  const Details = (
    <div className={cx(style({ variant }), className)}>
      <InformationCircleIcon className="h-6" />
      <Title as="h6" className="font-medium underline">
        Mehr Details
      </Title>
    </div>
  )

  if (!link) {
    return Details
  }

  return <Link href={link}>{Details}</Link>
}

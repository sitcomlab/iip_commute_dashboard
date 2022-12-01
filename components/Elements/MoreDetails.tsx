import { InformationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

const variants = {
  primary: 'text-primary',
  inverse: 'text-white',
}

export type MoreDetailsProps = {
  link?: string
  variant?: keyof typeof variants
  className?: string
}

export default function MoreDetails({
  link,
  variant = 'primary',
  className,
}: MoreDetailsProps) {
  const Details = (
    <div
      className={clsx(
        'flex cursor-pointer items-center space-x-1',
        variants[variant],
        className,
      )}
    >
      <InformationCircleIcon className="h-5" />
      <span className="text-sm font-semibold underline">Mehr Details</span>
    </div>
  )

  if (!link) {
    return Details
  }

  return <Link href={link}>{Details}</Link>
}

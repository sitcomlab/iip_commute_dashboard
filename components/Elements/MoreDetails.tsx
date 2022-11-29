import { InformationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

const variants = {
  primary: 'text-primary',
  inverse: 'text-white',
}

export type MoreDetailsProps = {
  link: string
  variant?: keyof typeof variants
}

export default function MoreDetails({
  link,
  variant = 'primary',
}: MoreDetailsProps) {
  return (
    <Link
      className={clsx('flex items-center space-x-1', variants[variant])}
      href={link}
    >
      <InformationCircleIcon className="h-5" />
      <span className="text-sm font-semibold underline">Mehr Details</span>
    </Link>
  )
}

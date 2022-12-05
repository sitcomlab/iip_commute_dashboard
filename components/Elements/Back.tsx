import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Back() {
  return (
    <Link className="flex items-center space-x-2 text-primary" href="/">
      <ArrowLeftIcon className="h-5"></ArrowLeftIcon>
      <span className="underline">Zurück</span>
    </Link>
  )
}

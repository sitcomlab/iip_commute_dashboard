import Link from 'next/link'
import {
  ArrowDownTrayIcon,
  InformationCircleIcon,
  ShareIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'

type TileFooterProps = {
  children?: React.ReactElement
}

/**
 * A footer for all tiles with sharing, export and embed button as well as a more information link
 * @returns TileFooter
 */
export default function TileFooter({ children }: TileFooterProps) {
  return (
    <div className="mt-6 flex w-full items-center justify-between">
      <div className="flex flex-1 space-x-1 text-primary">
        <Link href={'/embed/123'}>
          <SquaresPlusIcon className="h-5 stroke-2" />
        </Link>
        <Link href={'#'}>
          <ShareIcon className="h-5 stroke-2" />
        </Link>
        <Link href={'#'}>
          <ArrowDownTrayIcon className="h-5 stroke-2" />
        </Link>
      </div>
      <div className="flex flex-1 justify-center">{children}</div>
      <div className="flex flex-1 justify-end">
        <Link className="flex items-center space-x-1 text-primary" href={'#'}>
          <InformationCircleIcon className="h-5" />
          <span className="text-sm font-semibold underline">Mehr Details</span>
        </Link>
      </div>
    </div>
  )
}

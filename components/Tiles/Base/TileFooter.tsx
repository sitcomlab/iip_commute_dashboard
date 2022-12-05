import Link from 'next/link'
import {
  ArrowDownTrayIcon,
  ShareIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import MoreDetails from '@/components/Elements/MoreDetails'
import { cva, VariantProps } from 'class-variance-authority'

const tileFooterStyle = cva('flex flex-1 space-x-1', {
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

type TileFooterProps = VariantProps<typeof tileFooterStyle> & {
  children?: React.ReactElement
}

/**
 * A footer for all tiles with sharing, export and embed button as well as a more information link
 * @returns TileFooter
 */
export default function TileFooter({ children, variant }: TileFooterProps) {
  return (
    <div className="mt-6 flex w-full items-center justify-between">
      <div className={tileFooterStyle({ variant })}>
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
        <MoreDetails link="#" variant={variant} />
      </div>
    </div>
  )
}

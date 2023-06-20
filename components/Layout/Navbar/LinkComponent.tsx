import { Button } from '@/components/Elements/Button'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { SVGProps } from 'react'

export type LinkProps = {
  title: string
  icon: (_props: SVGProps<SVGSVGElement>) => JSX.Element
  link: string
  variant?: 'primary' | 'inverse'
  hover?: 'climate' | 'energy' | 'mobility' | 'buildings'
}

export default function LinkComponent({
  title,
  link,
  icon,
  variant = 'primary',
  hover,
}: LinkProps) {
  const Icon = icon
  return (
    <Link href={link}>
      <Button
        hover={hover}
        startIcon={
          <Icon
            className={cx(
              'h-[34px] transition-colors',
              variant === 'primary' ? 'text-primary' : 'text-white',
              hover === 'climate' && 'group-hover:text-climate',
              hover === 'energy' && 'group-hover:text-energy',
              hover === 'mobility' && 'group-hover:text-mobility',
              hover === 'buildings' && 'group-hover:text-buildings',
            )}
          />
        }
        variant={variant}
      >
        <Title as="h5" variant={variant}>
          {title}
        </Title>
      </Button>
    </Link>
  )
}

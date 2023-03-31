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
}

export default function LinkComponent({
  title,
  link,
  icon,
  variant = 'primary',
}: LinkProps) {
  const Icon = icon
  return (
    <Link href={link}>
      <Button
        startIcon={
          <Icon
            className={cx(
              'h-[34px]',
              variant === 'primary' ? 'text-primary' : 'text-white',
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

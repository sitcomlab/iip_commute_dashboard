import clsx from 'clsx'

const variants = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  inverse: 'text-white',
}

const sizes = {
  sm: 'md:text-md text-sm font-semibold',
  md: 'md:text-3xl text-xl',
  lg: 'md:text-5xl text-3xl',
}

type TitleProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  children: React.ReactElement | string
}

export default function Title({
  variant = 'primary',
  size = 'md',
  children,
}: TitleProps) {
  return (
    <span className={clsx(variants[variant], sizes[size])}>{children}</span>
  )
}

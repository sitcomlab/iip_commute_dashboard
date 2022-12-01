import clsx from 'clsx'

const variants = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  inverse: 'text-white',
}

const sizes = {
  sm: 'text-md font-semibold',
  md: 'text-3xl',
  lg: 'text-5xl',
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

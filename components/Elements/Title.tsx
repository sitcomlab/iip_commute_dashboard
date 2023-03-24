import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const TitleStyle = cva('block', {
  variants: {
    as: {
      h1: 'text-[80px] leading-[5.5rem]',
      h2: 'text-[50px] leading-[3.5rem] tracking-tight',
      h3: 'text-[40px] leading-[3rem]',
      h4: 'text-3xl leading-[36px]',
      h5: 'text-xl leading-6 tracking-wide',
      h6: 'text-lg tracking-wide',
      h7: 'text-base leading-7 tracking-wide',
      subtitle: 'text-3xl',
    },
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
      inverse: 'text-white',
      dark: 'text-zinc-900',
      eistage: 'text-climate',
      frosttage: 'text-primary',
      heisse_tage: 'text-energy',
      sommertage: 'text-mobility',
      tropennaechte: 'text-buildings',
    },
  },
})

type TitleProps = VariantProps<typeof TitleStyle> &
  HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <span
      {...props}
      className={cx(TitleStyle({ as, variant }), className)}
      style={{ hyphens: 'auto' }}
    >
      {children}
    </span>
  )
}

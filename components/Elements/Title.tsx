import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const TitleStyle = cva('block', {
  variants: {
    as: {
      h1: 'text-[40px] md:text-[80px] md:leading-[5.5rem]',
      h2: 'text-[30px] md:text-[50px] md:leading-[3.5rem] md:tracking-tight',
      h3: 'text-[30px] md:text-[40px] md:leading-[3rem]',
      h4: 'text-[20px] md:text-3xl md:leading-[36px]',
      h5: 'text-base md:text-xl md:leading-6 md:tracking-wide',
      h6: 'text-base md:text-lg md:tracking-wide',
      h7: 'text-base leading-7 tracking-wide',
      subtitle: 'text-xl md:text-3xl',
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
    font: {
      medium: 'font-medium',
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    font: 'medium',
  },
})

type TitleProps = VariantProps<typeof TitleStyle> &
  HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  font,
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <span
      {...props}
      className={cx(TitleStyle({ as, variant, font }), className)}
      style={{ hyphens: 'auto', ...props.style }}
    >
      {children}
    </span>
  )
}

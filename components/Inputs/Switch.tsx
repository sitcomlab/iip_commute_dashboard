import * as SwitchPrimitive from '@radix-ui/react-switch'
import { useState } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const switchThumbStyle = cva(
  'flex h-5 w-5 items-center justify-center rounded-full transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        mobility: 'bg-mobility',
        successStory: 'bg-secondary',
        climate: 'bg-climate',
      },
      checked: {
        true: 'translate-x-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

const switchThumbInnerStyle = cva(
  'h-4 w-4 rounded-full bg-white transition-opacity',
  {
    variants: {
      checked: {
        false: 'opacity-100',
        true: 'opacity-0',
      },
    },
  },
)

const switchBorderStyle = cva(
  'w-[3.25rem] p-1 rounded-full bg-white border-2',
  {
    variants: {
      variant: {
        primary: 'border-primary',
        mobility: 'border-mobility',
        successStory: 'border-secondary',
        climate: 'border-climate',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type SwitchProps = SwitchPrimitive.SwitchProps &
  VariantProps<typeof switchBorderStyle> & {
    label?: string
  }

export default function Switch({ label, variant, ...props }: SwitchProps) {
  const [checked, setChecked] = useState(props.defaultChecked)

  return (
    <div className="flex items-center space-x-4">
      <SwitchPrimitive.Root
        className={switchBorderStyle({ variant })}
        {...props}
        onCheckedChange={val => {
          if (props.onCheckedChange) {
            props.onCheckedChange(val)
          }
          setChecked(val)
        }}
      >
        <SwitchPrimitive.Thumb asChild>
          <div className={switchThumbStyle({ variant, checked })}>
            <div className={switchThumbInnerStyle({ checked })} />
          </div>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {label && <label className="text-primary">{label}</label>}
    </div>
  )
}

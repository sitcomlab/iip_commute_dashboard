'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'

type variants = {
  primary: string
  mobility: string
  successStory: string
  climate: string
}

const toggleGroupStyle = cva<{
  variant: variants
}>('flex h-fit w-fit overflow-hidden rounded-full border-2 bg-white', {
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
})

const toggleGroupBackgroundStyle = cva<{
  variant: variants
  isLast: {
    true: string
  }
}>('px-4 transition-all duration-300 md:py-2 md:px-8', {
  variants: {
    variant: {
      primary: 'bg-primary',
      mobility: 'bg-mobility',
      successStory: 'bg-secondary',
      climate: 'bg-climate',
    },
    isLast: {
      true: 'border-r-2',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      isLast: true,
      className: 'border-r-primary',
    },
    {
      variant: 'mobility',
      isLast: true,
      className: 'border-r-mobility',
    },
    {
      variant: 'successStory',
      isLast: true,
      className: 'border-r-secondary',
    },
    {
      variant: 'climate',
      isLast: true,
      className: 'border-r-climate',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
})

const selectedStyle = cva('px-4 transition-all duration-300 md:py-2 md:px-8', {
  variants: {
    variant: {
      primary: null,
      mobility: null,
      successStory: null,
      climate: null,
    },
    selected: {
      true: 'bg-opacity-100 text-white',
      false: 'bg-opacity-0',
    },
  },
  compoundVariants: [
    {
      selected: false,
      variant: 'primary',
      className: 'text-primary',
    },
    {
      selected: false,
      variant: 'mobility',
      className: 'text-mobility',
    },
    {
      selected: false,
      variant: 'successStory',
      className: 'text-secondary',
    },
    {
      selected: false,
      variant: 'climate',
      className: 'text-climate',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    selected: false,
  },
})

type ToggleGroupProps = VariantProps<typeof toggleGroupStyle> & {
  items: {
    element: string | React.ReactElement
    value: string
  }[]
}

export default function ToggleGroup({ items, variant }: ToggleGroupProps) {
  const [value, setValue] = useState(items[0].value)

  return (
    <ToggleGroupPrimitive.Root
      className={toggleGroupStyle({ variant })}
      onValueChange={value => {
        if (value) {
          setValue(value)
        }
      }}
      type="single"
      value={value}
    >
      {items.map((e, i) => (
        <ToggleGroupPrimitive.Item
          className={cx(
            toggleGroupBackgroundStyle({
              variant,
              isLast: i !== items.length - 1,
            }),
            selectedStyle({
              variant,
              selected: value === e.value,
            }),
          )}
          key={i}
          value={e.value}
        >
          {typeof e.element === 'string' ? <span>{e.element}</span> : e.element}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}

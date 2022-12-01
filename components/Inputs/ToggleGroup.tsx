'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { useState } from 'react'

const variants = {
  primary: 'border-primary',
  mobility: 'border-green-500',
  successStory: 'border-secondary',
  climate: 'border-sky-500',
}

const background = {
  primary: 'bg-primary',
  mobility: 'bg-green-500',
  successStory: 'bg-secondary',
  climate: 'bg-sky-500',
}

const lastBorder = {
  primary: 'border-r-primary',
  mobility: 'border-r-green-500',
  successStory: 'border-r-secondary',
  climate: 'border-r-sky-500',
}

const textColor = {
  primary: 'text-primary',
  mobility: 'text-green-500',
  successStory: 'text-secondary',
  climate: 'text-sky-500',
}

type ToggleGroupProps = {
  items: {
    element: string | React.ReactElement
    value: string
  }[]
  variant?: keyof typeof variants
}

export default function ToggleGroup({
  items,
  variant = 'primary',
}: ToggleGroupProps) {
  const [value, setValue] = useState(items[0].value)

  return (
    <ToggleGroupPrimitive.Root
      className={clsx(
        'flex h-fit w-fit overflow-hidden rounded-full border-2 bg-white',
        variants[variant],
      )}
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
          className={clsx(
            'py-2 px-8 transition-all duration-300',
            background[variant],
            i !== items.length - 1 && `border-r-2 ${lastBorder[variant]}`,
            value === e.value
              ? 'bg-opacity-100 text-white'
              : `bg-opacity-0 ${textColor[variant]}`,
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

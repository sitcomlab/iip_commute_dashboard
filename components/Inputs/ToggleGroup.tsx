'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { useState } from 'react'

type ToggleGroupProps = {
  items: {
    element: string | React.ReactElement
    value: string
  }[]
}

export default function ToggleGroup({ items }: ToggleGroupProps) {
  const [value, setValue] = useState(items[0].value)

  return (
    <ToggleGroupPrimitive.Root
      className="flex h-fit w-fit overflow-hidden rounded-full border-2 border-secondary bg-white"
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
            'bg-secondary py-2 px-8 transition-all duration-300',
            i !== items.length - 1 && 'border-r-2 border-r-secondary',
            value === e.value
              ? 'bg-opacity-100 text-white'
              : 'bg-opacity-0 text-primary',
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

'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'

export type SliderProps = SliderPrimitive.SliderProps & {
  labels?: string[]
}

export default function Slider({ labels, ...props }: SliderProps) {
  return (
    <div className="mt-1 p-1">
      <SliderPrimitive.Root
        aria-label="Volume"
        className="relative flex w-full items-center"
        {...props}
      >
        <SliderPrimitive.Track className="relative h-4 flex-1 rounded-full bg-gray-500 opacity-30 mix-blend-color-burn" />
        <SliderPrimitive.Thumb className="block h-6 w-6 touch-pan-x rounded-full bg-primary shadow shadow-primary" />
      </SliderPrimitive.Root>
      {labels && (
        <div className="mt-2 flex w-full justify-between">
          {labels.map((l, i) => (
            <span className="text-primary" key={i}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

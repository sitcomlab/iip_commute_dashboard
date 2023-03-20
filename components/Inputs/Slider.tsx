'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Title from '../Elements/Title'

export type SliderProps = SliderPrimitive.SliderProps & {
  labels?: string[]
}

export default function Slider({ labels, ...props }: SliderProps) {
  return (
    <div>
      <SliderPrimitive.Root
        aria-label="Volume"
        className="relative flex w-full items-center"
        {...props}
      >
        <SliderPrimitive.Track className="relative h-5 flex-1 rounded-full bg-gray-500 mix-blend-color-burn" />
        <SliderPrimitive.Thumb className="block aspect-square h-9 touch-pan-x rounded-full bg-primary shadow shadow-primary" />
      </SliderPrimitive.Root>
      {labels && (
        <div className="mt-3 flex w-full justify-between">
          {labels.map((l, i) => (
            <Title as={'h5'} key={i} variant={'primary'}>
              {l}
            </Title>
          ))}
        </div>
      )}
    </div>
  )
}

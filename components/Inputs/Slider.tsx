'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Title from '../Elements/Title'
import { cva, VariantProps } from 'class-variance-authority'

const sliderStyle = cva('relative h-5 flex-1 rounded-full bg-opacity-20', {
  variants: {
    variant: {
      primary: 'bg-primary',
      mobility: 'bg-mobility',
      successStory: 'bg-secondary',
      climate: 'bg-climate',
      energy: 'bg-energy',
      buildungs: 'bg-buildings',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type SliderProps = SliderPrimitive.SliderProps &
  VariantProps<typeof sliderStyle> & {
    labels?: string[]
  }

export default function Slider({ labels, variant, ...props }: SliderProps) {
  return (
    <div>
      <SliderPrimitive.Root
        aria-label="Volume"
        className="relative flex w-full items-center"
        {...props}
      >
        <SliderPrimitive.Track className={sliderStyle({ variant })} />
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

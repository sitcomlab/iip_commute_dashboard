'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { PlaneBus } from '@/components/Icons'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

interface PassengerDataProps {
  ZEIT: number
  value: number
}

const data: PassengerDataProps[] = [
  {
    ZEIT: 2017,
    value: 20,
  },
  {
    ZEIT: 2018,
    value: 40,
  },
  {
    ZEIT: 2019,
    value: 41,
  },
  {
    ZEIT: 2020,
    value: 42,
  },
  {
    ZEIT: 2021,
    value: 46,
  },
  {
    ZEIT: 2022,
    value: 49,
  },
]

export default function PassengerContent() {
  const { width } = useWindowSize()
  const years = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(0)
  const [passengerValue, setPassengerValue] = useState(0)

  useEffect(() => {
    setPassengerValue(data[yearIndex].value)
  }, [yearIndex])
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <PlaneBus className="h-20 text-primary md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as={'subtitle'}>
            <span className="font-bold text-mobility">
              <AnimatedNumber>{passengerValue}</AnimatedNumber> Mio
            </span>{' '}
          </Title>
          {width >= 1800 && (
            <Slider
              defaultValue={[yearIndex]}
              labels={years}
              max={years.length - 1}
              min={0}
              onValueChange={([e]) => {
                setYearIndex(e)
              }}
              variant={'mobility'}
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        {width < 1800 && (
          <MobileSlider
            defaultValue={[yearIndex]}
            labels={years}
            max={years.length - 1}
            min={0}
            onValueChange={([e]) => {
              setYearIndex(e)
            }}
            variant={'mobility'}
          />
        )}
      </div>
    </div>
  )
}

'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { Opnvbus, Passenger } from '@/components/Icons'
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
    ZEIT: 2018,
    value: 46.3,
  },
  {
    ZEIT: 2019,
    value: 49.0,
  },
  {
    ZEIT: 2020,
    value: 43.9,
  },
  {
    ZEIT: 2021,
    value: 41.0,
  },
  {
    ZEIT: 2022,
    value: 46.8,
  },
]

export default function PassengerContent() {
  const { width } = useWindowSize()
  const years = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )
  const [passengerValue, setPassengerValue] = useState(0)

  useEffect(() => {
    setPassengerValue(data[yearIndex].value)
  }, [yearIndex])
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <Opnvbus className="h-20 text-primary md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as="h3" variant={'mobility'}>
            <AnimatedNumber decimals={2}>{passengerValue}</AnimatedNumber> Mio
          </Title>
          <div className="flex justify-end pb-4">
            <span>
              <Passenger className="h-10 text-primary md:h-14" />
            </span>
            <span>
              <Passenger className="h-10 text-primary md:h-14" />
            </span>
            <span>
              <Passenger className="h-10 text-primary md:h-14" />
            </span>
            <span>
              <Passenger className="hidden h-10 text-primary md:block md:h-14" />
            </span>
          </div>
          {width >= 1800 && (
            <Slider
              defaultValue={[years.length - 1]}
              firstValueMobile={years.length - 1}
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
            defaultValue={[years.length - 1]}
            firstValueMobile={years.length - 1}
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

'use client'

import Carousel from '@/components/Elements/Carousel'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { useState } from 'react'
import { useWindowSize } from 'react-use'
import monatsmittelwerte from '@/assets/data/monatsmittelwerte.json'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import TrafficMap from './TrafficMap'

function Toggle({ onChange }: { onChange: (_val: string) => void }) {
  return (
    <ToggleGroup
      defaultValue="current"
      items={[
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2013
            </Title>
          ),
          value: '2013',
        },
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2019
            </Title>
          ),
          value: '2019',
        },
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              Aktuelles Jahr
            </Title>
          ),
          value: 'current',
        },
      ]}
      onChange={onChange}
      variant={'mobility'}
    />
  )
}

const kfzIcon = require('@/assets/icons/Trafficload/TrafficloadCar.svg').default
  .src

const getIcon = (width: number) => {
  return {
    value: 0,
    label: {
      show: true,
      position: 'center',
      formatter: '{Icon|}',
      rich: {
        Icon: {
          height: width <= 1600 ? 30 : 40,
          width: width <= 1600 ? 25 : 50,
          align: 'left',
          backgroundColor: {
            image: `${kfzIcon}`,
          },
        },
      },
    },
  }
}

const getLabel = (value: number, name: string, width: number) => {
  return {
    value: value,
    name: name,
    label: {
      show: width > 1024,
      textStyle: {
        opacity: 1,
      },
      emphasis: {
        opacity: 1,
      },
      formatter: () => {
        const monatsmittelValue = value !== 0 ? value : 'Keine Daten'
        return `{street|${name}}\n{monatsmittel|${monatsmittelValue}}`
      },
      rich: {
        street: {
          color: '#005b79',
          fontWeight: 'bold',
          align: 'left',
          fontSize: width <= 1600 ? 16 : 20,
          padding: width <= 1600 ? [6, 0, 6, 0] : [18, 0, 6, 0],
        },
        monatsmittel: {
          color: '#34c17b',
          align: 'left',
          fontSize: width <= 1600 ? 32 : 40,
          fontWeight: '500',
        },
      },
    },
  }
}

export default function TrafficloadContent() {
  const [monthIndex, setMonthIndex] = useState(4)
  const [mode, setMode] = useState<'2013' | '2019' | 'current'>('current')
  const { width } = useWindowSize()

  let year: string
  if (mode === 'current') {
    year = new Date().getFullYear().toString()
  } else {
    year = mode
  }

  const data = monatsmittelwerte.features.filter(f => {
    return (
      f.properties.year.toString() === year &&
      f.properties.month === monthIndex + 1
    )
  })

  const albersloher = data.find(d => d.properties.amknotennr === 10010750)
  const warendorfer = data.find(d => d.properties.amknotennr === 10011170)
  const weseler = data.find(d => d.properties.amknotennr === 10022200)
  const rishon = data.find(d => d.properties.amknotennr === 10024088)
  const steinfurter = data.find(d => d.properties.amknotennr === 20000723)

  const streetData = {
    'Albersloher Weg / Heumannsweg':
      albersloher?.properties.mittelwert.toFixed(0) ?? 0,
    'Warendorfer Str. / Schifffahrter Damm':
      warendorfer?.properties.mittelwert.toFixed(0) ?? 0,
    'Weseler Str. / Inselbogen': weseler?.properties.mittelwert.toFixed(0) ?? 0,
    'Rishon-le-Zion-Ring / Einsteinstr.':
      rishon?.properties.mittelwert.toFixed(0) ?? 0,
    'Steinfurter Str. / Austermannstr.':
      steinfurter?.properties.mittelwert.toFixed(0) ?? 0,
  }

  console.log(streetData['Albersloher Weg / Heumannsweg'] as number)

  return (
    <>
      <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute -top-4 left-0 w-full md:-top-6 md:w-auto">
          <Toggle onChange={val => setMode(val as typeof mode)} />
        </div>
        <div className="absolute bottom-5 left-0 flex h-[80%] w-full justify-center">
          <TrafficMap
            albersloher={streetData['Albersloher Weg / Heumannsweg'] as number}
            className="h-full"
            rishon={streetData['Rishon-le-Zion-Ring / Einsteinstr.'] as number}
            steinfurter={
              streetData['Steinfurter Str. / Austermannstr.'] as number
            }
            warendorfer={
              streetData['Warendorfer Str. / Schifffahrter Damm'] as number
            }
            weseler={streetData['Weseler Str. / Inselbogen'] as number}
          />
        </div>
      </div>
      <div className="bg-white px-4 pb-4 lg:hidden">
        <Carousel arrows variant={'mobility'}>
          {Object.keys(streetData).map((key, index) => {
            const val = parseInt(
              streetData[key as keyof typeof streetData] as string,
            )
            return (
              <div
                className="flex items-center justify-center gap-3"
                key={index}
              >
                <div>
                  <Title as="h5" variant={'primary'}>
                    {key}
                  </Title>
                  <Title
                    as="h3"
                    style={{
                      color: '#34c17b',
                    }}
                  >
                    <AnimatedNumber>{val}</AnimatedNumber>
                  </Title>
                </div>
              </div>
            )
          })}
        </Carousel>
      </div>
      <Slider
        defaultValue={[monthIndex]}
        firstValueMobile={4} // MONAT MAI NUR FÜR DEMO
        labels={[
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAI',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OKT',
          'NOV',
          'DEZ',
        ]}
        max={11}
        min={0}
        onValueChange={([e]) => {
          setMonthIndex(e)
        }}
        variant={'mobility'}
      />
    </>
  )
}

'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'

import waermeData from '@/assets/data/waerme.json'
import stromData from '@/assets/data/strom.json'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'

type DataType = {
  Datum: number
  stadtbuecherei: number | null
  sentruper: number | null
  rathaus: number | null
  'freiherr-von-stein': number | null
}

type Building = Omit<DataType, 'Datum'>

const buildings: Record<keyof Building, string> = {
  stadtbuecherei: 'Stadtbücherei',
  sentruper: 'Sportantlage Sentruper Höhe',
  rathaus: 'Rathaus / Stadtweinhaus',
  'freiherr-von-stein': 'Freiherr-von-Stein-Gymnasium',
}

function getData(
  mode: 'strom' | 'waerme',
  building: keyof Building,
  year: number,
) {
  const data: DataType[] = mode === 'strom' ? stromData : waermeData

  const filteredYear = data.filter(
    d => year === new Date(d.Datum).getFullYear(),
  )

  return filteredYear.map(d => d[building]).filter(d => d !== null) as number[]
}

function getYearSum(
  mode: 'strom' | 'waerme',
  building: keyof Building,
  year: number,
) {
  const data = getData(mode, building, year)

  return data.reduce((a, b) => a + b, 0)
}

const years = Array.from(
  new Set(stromData.map(d => new Date(d.Datum).getFullYear())),
).sort((a, b) => a - b)

export default function EnergyConsumptionContent() {
  const [mode, setMode] = useState<'strom' | 'waerme'>('strom')
  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  return (
    <>
      <div className="relative h-full w-full rounded bg-white p-5">
        <div className="absolute -top-6 right-0">
          <ToggleGroup
            items={[
              {
                element: 'Strom',
                value: 'strom',
              },
              {
                element: 'Wärme',
                value: 'waerme',
              },
            ]}
            onChange={value => setMode(value as 'strom' | 'waerme')}
            variant={'building'}
          ></ToggleGroup>
        </div>

        <div className="flex h-full w-full justify-between">
          {Object.keys(buildings).map(building => (
            <div className="flex-1 p-2" key={building}>
              <Title as="h4" className="h-20" variant="building">
                {buildings[building as keyof Building]}
              </Title>
            </div>
          ))}
        </div>
        <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
        <div className="flex h-full w-full justify-between">
          {Object.keys(buildings).map(building => (
            <div className="h-72 w-full" key={building}>
              <EnergyConsumptionChart
                data={getData(
                  mode,
                  building as keyof Building,
                  years[yearIndex],
                )}
              />
            </div>
          ))}
        </div>
        <LabelSeperator>Jahresverbrauch</LabelSeperator>
        <Spacer size={'sm'}></Spacer>
        <div className="flex h-full w-full justify-between">
          {Object.keys(buildings).map(building => (
            <div className="flex w-full gap-1" key={building}>
              <Title as="h3" className="font-medium" variant="building">
                <AnimatedNumber decimals={0}>
                  {getYearSum(
                    mode,
                    building as keyof Building,
                    years[yearIndex],
                  )}
                </AnimatedNumber>
              </Title>
              <Title as="h3" className="font-regular" variant="building">
                kWh
              </Title>
            </div>
          ))}
        </div>
      </div>
      <Slider
        defaultValue={[yearIndex]}
        labels={years.map(e => e.toString())}
        max={years.length - 1}
        min={0}
        onValueChange={([e]) => {
          setYearIndex(e)
        }}
        variant={'buildings'}
      />
    </>
  )
}

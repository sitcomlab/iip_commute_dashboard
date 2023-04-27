'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'

import waermeData from '@/assets/data/waerme.json'
import stromData from '@/assets/data/strom.json'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'
import EnergyConsumptionChart from './EnergyConsumptionChart'

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
              <Title as="h5" className="h-20" variant="building">
                {buildings[building as keyof Building]}
              </Title>
              <div className="h-72">
                <EnergyConsumptionChart
                  data={getData(
                    mode,
                    building as keyof Building,
                    years[yearIndex],
                  )}
                />
              </div>
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

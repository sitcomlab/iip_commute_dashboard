'use client'

import Switch from '@/components/Inputs/Switch'
import MobilityTile from '@/components/Tiles/Base/MobilityTile'
import { useState } from 'react'
import Chart from './Chart'

export default function StadtradelnTile() {
  const [compare, setCompare] = useState(false)

  return (
    <MobilityTile subtitle="auf der Überholspur" title="Stadtradeln">
      <div className="rounded bg-white p-2">
        <div className="h-96 ">
          <Chart compare={compare} />
        </div>
        <div className="flex items-center space-x-4 p-4">
          <div className="h-1 w-12 rounded bg-mobility" />
          <p className="text-primary">geradelte Kilometer in Münster</p>
        </div>
        <div className="flex w-full flex-col justify-between space-y-2 rounded border border-dashed border-primary p-4 lg:flex-row lg:space-x-2">
          <Switch
            defaultChecked={compare}
            label="Städtevergleich"
            onCheckedChange={setCompare}
            variant={'mobility'}
          />
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 rounded bg-energy" />
            <p className="text-primary">Freiburg</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 rounded bg-buildings" />
            <p className="text-primary">Konstanz</p>
          </div>
        </div>
      </div>
      <p className="my-2">
        Auf die Leeze, fertig, los! Für mehr Radverkehr, Klimaschutz und
        Lebensqualität in die Pedale treten: Seit 2020 beteiligt sich die Stadt
        Münster an der jährlich stattfindenden, dreiwöchigen bundesweiten Aktion
        „Stadtradeln“ des globalen Netzwerks „Klima-Bündnis“.
      </p>
    </MobilityTile>
  )
}

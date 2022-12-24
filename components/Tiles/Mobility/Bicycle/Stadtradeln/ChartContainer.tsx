'use client'

import Switch from '@/components/Inputs/Switch'
import { useEffect, useState } from 'react'
import Chart from './Chart'
import stadtradelnData from '@/assets/data/stadtradeln.json'

type StadtradelnData = {
  name: string
  data: {
    year: number
    km: number
  }[]
}

const otherCities = Object.keys(stadtradelnData)
  .filter(k => k !== 'muenster')
  // @ts-ignore
  .map(k => stadtradelnData[k] as StadtradelnData)

const COMPARE_INTERVAL = 3000

export default function ChartContainer() {
  const [compare, setCompare] = useState(false)
  const [otherData, setOtherData] = useState<StadtradelnData>()
  const [otherIndex, setOtherIndex] = useState(0)

  useEffect(() => {
    if (!compare) {
      setOtherData(undefined)
      return
    }

    const timer = setInterval(() => {
      setOtherIndex(prevIndex => prevIndex + 1)
    }, COMPARE_INTERVAL)

    return () => clearInterval(timer)
  }, [compare])

  useEffect(() => {
    if (!compare) {
      setOtherData(undefined)
      return
    }

    if (otherIndex >= otherCities.length) {
      setOtherIndex(0)
      return
    }

    setOtherData(otherCities[otherIndex])
  }, [otherIndex])

  return (
    <div className="rounded bg-white p-2">
      <div className="flex h-96 w-full items-center justify-center">
        <Chart
          compare={compare}
          data={stadtradelnData.muenster}
          other={otherData}
        />
      </div>
      <div className="flex items-center space-x-4 p-4">
        <div className="h-1 w-12 rounded bg-mobility" />
        <p className="text-primary">geradelte Kilometer in Münster</p>
      </div>
      <div className="flex w-full flex-col items-center rounded border border-dashed border-primary p-4 lg:flex-row lg:space-x-2">
        <Switch
          defaultChecked={compare}
          label="Städtevergleich"
          onCheckedChange={setCompare}
          variant={'mobility'}
        />
        {otherData && (
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 rounded bg-buildings" />
            <p className="text-primary">{otherData.name}</p>
          </div>
        )}
      </div>
    </div>
  )
}

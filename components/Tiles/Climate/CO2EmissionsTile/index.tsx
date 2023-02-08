'use client'

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { Co2City } from '@/components/Icons'
import Switch from '@/components/Inputs/Switch'
import { useState } from 'react'
import ClimateTile from '../ClimateTile'
import CO2Chart from './CO2Chart'

export default function CO2EmissionsTile() {
  const [showFuture, setShowFuture] = useState(true)

  return (
    <ClimateTile
      dataRetrieval="01.01.2022"
      dataSource="Stadt Münster - Koordinierungsstelle für Klima und Energie"
      embedId="CO2"
      title={
        <span className="flex items-center space-x-4">
          <span>CO₂</span>
          <span className="text-xl font-semibold text-black">
            So viel wird in Münster <br /> ausgestoßen
          </span>
        </span>
      }
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex h-full flex-col rounded bg-white p-2">
            <div className="flex flex-col justify-between md:flex-row md:px-16 md:pt-4">
              <Title as={'h6'} variant="dark">
                CO₂-Emissionen in 1000t
              </Title>
              <Switch
                defaultChecked={showFuture}
                label="Klimaneutral"
                onCheckedChange={setShowFuture}
                variant="climate"
              />
            </div>
            <div className="w-full flex-1">
              <CO2Chart showFuture={showFuture} />
            </div>
          </div>
        </div>
        <div className="flex w-96 flex-none flex-col items-center justify-between py-4 md:py-0 md:px-8">
          <Title as="h5" variant={'dark'}>
            Trotz einer wachsenden Zahl von Einwohner*innen sinkt die Kurve der
            CO₂-Emissionen in Münster. Das zeigt: Münsteraner*innen setzen mehr
            und mehr Klimaschutz-Maßnahmen um. Mit dem Ziel der Klimaneutralität
            bis 2030 soll die Kurve nun nochmals deutlich steiler sinken.
          </Title>
          <Spacer />
          <Co2City className="mx-auto w-40" />
        </div>
      </div>
    </ClimateTile>
  )
}

'use client'

import Title from '@/components/Elements/Title'
import { useState } from 'react'
import CO2Chart from './CO2Chart'
import Switch from '@/components/Inputs/Switch'

export default function CO2EmissionsContent() {
  const [showFuture, setShowFuture] = useState(true)

  return (
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
  )
}

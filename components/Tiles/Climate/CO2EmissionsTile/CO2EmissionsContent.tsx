'use client'

import { useState } from 'react'
import CO2Chart from './CO2Chart'
import Switch from '@/components/Inputs/Switch'

export default function CO2EmissionsContent() {
  const [showFuture, setShowFuture] = useState(true)

  return (
    <div className="relative h-full rounded bg-white p-5">
      <div className="absolute -top-6 right-0 px-5">
        <Switch
          defaultChecked={showFuture}
          label="Klimaneutral"
          onCheckedChange={setShowFuture}
          variant="climate"
        />
      </div>
      <div className="h-full w-full">
        <CO2Chart showFuture={showFuture} />
      </div>
    </div>
  )
}

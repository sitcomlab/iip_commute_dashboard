'use client'

import Title from '@/components/Elements/Title'
import Switch from '@/components/Inputs/Switch'
import { BeakerIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import ClimateTile from '../ClimateTile'
import CO2Chart from './CO2Chart'

export default function CO2EmissionsTile() {
  const [showFuture, setShowFuture] = useState(true)

  return (
    <ClimateTile
      title={
        <span className="flex items-center space-x-4">
          <span className="font-medium">CO₂</span>
          <span className="text-xl font-semibold text-black">
            So viel wird in Münster <br /> ausgestoßen
          </span>
        </span>
      }
    >
      <div className="flex">
        <div className="flex-1">
          <div className="flex h-96 flex-col rounded bg-white p-2">
            <div className="flex flex-col justify-between md:flex-row md:px-16 md:pt-4">
              <Title size={'sm'}>CO₂-Emissionen in 1000t</Title>
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
        <div className="w-72 flex-none px-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            officiis quam, velit sed officia dolores debitis quo nesciunt rem
            iste libero, aut ullam sapiente. Soluta quia debitis maiores
            voluptatum obcaecati!
          </p>
          <BeakerIcon className="mx-auto h-12 w-12 text-primary" />
        </div>
      </div>
    </ClimateTile>
  )
}

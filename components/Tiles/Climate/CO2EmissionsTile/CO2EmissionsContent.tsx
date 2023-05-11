'use client'

import { useState } from 'react'
import CO2Chart from './CO2Chart'
import Switch from '@/components/Inputs/Switch'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import Title from '@/components/Elements/Title'
import { Transition } from '@headlessui/react'

function Toggle({ onChange }: { onChange: (_val: string) => void }) {
  return (
    <ToggleGroup
      items={[
        {
          element: (
            <Title as="h5" className="2xl:w-max">
              Endenergieverbrauch in GWh
            </Title>
          ),
          value: 'endenergie',
        },
        {
          element: (
            <Title as="h5" className="2xl:w-max">
              CO₂ Emissionen in 1000 t
            </Title>
          ),
          value: 'co2',
        },
      ]}
      onChange={onChange}
      variant={'climate'}
    />
  )
}

export default function CO2EmissionsContent() {
  const [showFuture, setShowFuture] = useState(true)

  const [mode, setMode] = useState<'endenergie' | 'co2'>('endenergie')

  return (
    <div className="h-full md:pb-10">
      <div className="relative h-full rounded bg-white p-5 py-10 md:mt-5">
        <div className="absolute -top-6 right-0 flex w-full items-center justify-end px-5 2xl:justify-between">
          <div className="hidden 2xl:block">
            <Toggle onChange={val => setMode(val as typeof mode)} />
          </div>
          <Transition
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={mode === 'co2'}
          >
            <Switch
              defaultChecked={showFuture}
              label="Klimaneutral"
              onCheckedChange={setShowFuture}
              variant="climate"
            />
          </Transition>
        </div>
        <div className="h-full w-full">
          <CO2Chart mode={mode} showFuture={showFuture} />
        </div>
      </div>
      <div className="relative block w-full -translate-y-1/2 2xl:hidden">
        <Toggle onChange={val => setMode(val as typeof mode)} />
      </div>
    </div>
  )
}

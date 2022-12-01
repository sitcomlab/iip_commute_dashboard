'use client'

import Switch from '@/components/Inputs/Switch'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { BeakerIcon } from '@heroicons/react/24/outline'
import ClimateTile from '../../Base/ClimateTile'

export default function CO2EmissionsTile() {
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
          <div className="flex justify-between">
            <ToggleGroup
              items={[
                {
                  element: 'Endenergieverbrauch in GWh',
                  value: 'A',
                },
                {
                  element: 'CO₂-Emissionen in 1000t',
                  value: 'B',
                },
              ]}
              variant="climate"
            />
            <Switch label="Klimaneutral" variant="climate" />
          </div>
          <div className="bg-white p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            impedit facere dolore perspiciatis quos cumque exercitationem
            praesentium eos porro iusto qui repellendus, eaque iure deserunt
            fuga, quae aliquid itaque vel?
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

'use client'

import Switch from '@/components/Inputs/Switch'
import { useState } from 'react'
import ClimateTile from '../ClimateTile'
import ExtremeWeatherChart from './ExtremeWeatherChart'
import { Spacer } from '@/components/Elements/Spacer'

export default function CO2EmissionsTile() {
  const [showSnow, setShowSnow] = useState(false)
  const [showHeat, setShowHeat] = useState(false)
  const [showDryness, setShowDryness] = useState(false)
  const [showHeavyRain, setShowHeavyRain] = useState(false)
  const [showStorm, setShowStorm] = useState(false)

  return (
    <ClimateTile
      dataRetrieval="01.01.2022"
      dataSource="Stadt Münster - Koordinierungsstelle für Klima und Energie"
      embedId="extremwetter"
      title={
        <span className="flex items-center space-x-4">
          <span className="font-medium">Extremwetter</span>
          <span className="text-xl font-semibold text-black">
            Häufigkeiten von Extremwettererignissein <br /> im Zeitraum der
            letzten 20 Jahre
          </span>
        </span>
      }
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex h-96 flex-col rounded bg-white p-2">
            <div className="flex flex-col justify-between md:flex-row md:px-16 md:pt-4">
              <div className="h-full w-full">
                <ExtremeWeatherChart />
              </div>
              <div className="flex flex-col">
                <p>2021</p>
                <p>1 Ergebnis</p>
                <Spacer></Spacer>
                <Switch
                  defaultChecked={showSnow}
                  label="Schnee"
                  onCheckedChange={setShowSnow}
                  variant="climate"
                />
                <Switch
                  defaultChecked={showHeat}
                  label="Hitze"
                  onCheckedChange={setShowHeat}
                  variant="climate"
                />
                <Switch
                  defaultChecked={showDryness}
                  label="Trockenheit"
                  onCheckedChange={setShowDryness}
                  variant="climate"
                />
                <Switch
                  defaultChecked={showHeavyRain}
                  label="Starkregen"
                  onCheckedChange={setShowHeavyRain}
                  variant="climate"
                />
                <Switch
                  defaultChecked={showStorm}
                  label="Sturm"
                  onCheckedChange={setShowStorm}
                  variant="climate"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-72 flex-none py-4 md:py-0 md:px-4">
          <p>
            In den vergangenen 20 Jahren ist die Zahl extremer Wetterphänomene
            teils um das Fünffache angestiegen
          </p>
        </div>
      </div>
    </ClimateTile>
  )
}

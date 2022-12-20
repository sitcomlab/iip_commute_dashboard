'use client'

import AnimatedNumber from '@/components/Elements/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import { BusCombustionIcon, BusElectroIcon } from '@/components/Icons'
import { useBusData } from '@/hooks/useBusData'
import MobilityTile from '../MobilityTile'

export default function BusTile() {
  const { electroCount, combustionCount } = useBusData()

  return (
    <MobilityTile
      dataSource="Stadtwerke Münster"
      embedId="bus"
      live
      subtitle="Anzahl im Vergleich zu Bussen mit fossilem Antrieb"
      title="E-Busse"
    >
      <div>
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-primary">
              Fahrzeuge mit fossilem Antrieb
            </p>
            <AnimatedNumber className="text-2xl text-mobility">
              {combustionCount}
            </AnimatedNumber>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-medium text-primary">
              Fahrzeuge mit Elektroantrieb
            </p>
            <AnimatedNumber className="text-2xl text-mobility">
              {electroCount}
            </AnimatedNumber>
          </div>
        </div>
        <div className="flex w-full items-end rounded bg-white p-4">
          <div
            className="flex-none transition-all"
            style={{
              width: `${
                (combustionCount / (electroCount + combustionCount) || 0.5) *
                100
              }%`,
            }}
          >
            <BusCombustionIcon className="w-full pr-2" />
          </div>
          <div className="flex-1 px-12">
            <BusElectroIcon className="w-full pl-2" />
          </div>
        </div>
        <Spacer />
        <p className="font-medium text-primary">
          Busfahren ist Klimaschutz. Damit die Umweltbilanz des Nahverkehrs noch
          besser wird, setzen wir immer stärker auf Elektrobusse mit Ökostrom im
          Tank. In Münster sind die leisen und abgasfreien Busse bereits seit
          2015 unterwegs und gehören längst zum Stadtbild. Und jedes Jahr werden
          es mehr! Bis 2029 soll unsere Busflotte komplett elektrisch fahren.
        </p>
      </div>
    </MobilityTile>
  )
}

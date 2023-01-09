'use client'

import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import ModalSplitChart from './ModalSplitChart'
import { ModalsplitHintergrundgrafik } from '@/components/Icons'

export default function KmTile() {
  return (
    <MobilityTile
      dataRetrieval="live"
      dataSource="Stadt Münster - Amt für Mobilität"
      embedId="km"
      title={
        <span className="flex items-center space-x-4">
          <span className="font-medium">km</span>
          <span className="text-xl font-semibold text-black">
            Jahresvergleich aller 2019 zurückgelegten Kilometer in Münster{' '}
            <br /> (PKW, Fahrrad & co)
          </span>
        </span>
      }
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2">
          <div className="absolute top-0 left-0 flex h-full w-full p-1">
            <ModalsplitHintergrundgrafik className="h-full w-full flex-1" />
            <div className="w-14"></div>
          </div>
          <div className="w-full flex-1 pb-12">
            <ModalSplitChart />
          </div>
        </div>
        <div className="w-72 flex-none py-4 md:py-0 md:px-4">
          <p className="font-semibold">
            Trotz einer wachsenden Zahl von Einwohner*innen sinkt die Kurve der
            CO₂-Emissionen in Münster. Das zeigt: Münsteraner*innen setzen mehr
            und mehr Klimaschutz-Maßnahmen um. Mit dem Ziel der Klimaneutralität
            bis 2030 soll die Kurve nun nochmals deutlich steiler sinken.
          </p>
        </div>
      </div>
    </MobilityTile>
  )
}

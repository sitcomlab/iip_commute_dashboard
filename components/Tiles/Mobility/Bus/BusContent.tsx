'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { BusCombustion, BusElectro } from '@/components/Icons'
// @ts-ignore
import BusData from '@/assets/data/stadtwerke-bus-fahrzeuge.csv'
import { useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'

type BusDataType = {
  ZEIT: string
  'Fahrzeuge Alternative Antriebe Elektro': number
  'Fahrzeuge Alternative Antriebe Gesamt': number
  'Fahrzeuge Alternative Antriebe H2': number
  'Fahrzeuge Alternative Antriebe Hybrid': number
  'Fahrzeuge SWMS': number
  'Fahrzeuge Sub': number
  'Fahrzeuge awm - Alternativer Antrieb': number
  'Fahrzeuge awm - Verbrenner': number
}

export default function BusContent() {
  // const { electroCount, combustionCount } = useBusData()
  const { width } = useWindowSize()
  const [yearIndex, setYearIndex] = useState(0)
  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)

  const data: BusDataType[] = BusData
  const [reducedData, setReducedData] = useState<BusDataType[]>([])

  useEffect(() => {
    if (!data) {
      return
    }
    const reducedDataLocal: BusDataType[] = []
    let currentYear = ''
    data.forEach(item => {
      if (currentYear === item.ZEIT.toString().substring(0, 4)) {
        return
      }
      currentYear = item.ZEIT.toString().substring(0, 4)
      const row: BusDataType | undefined = data
        .slice()
        .reverse()
        .find(item => item.ZEIT.toString().substring(0, 4) === currentYear)
      if (
        row &&
        row['Fahrzeuge SWMS'] &&
        row['Fahrzeuge Alternative Antriebe Elektro']
      ) {
        reducedDataLocal.push({ ...row, ZEIT: currentYear })
      }
    })
    setReducedData(reducedDataLocal)
  }, [data])

  useEffect(() => {
    if (!reducedData) {
      return
    }
    const row: BusDataType = reducedData[yearIndex]
    if (row) {
      setElectroCount(row['Fahrzeuge Alternative Antriebe Elektro'])
      setCombustionCount(
        row['Fahrzeuge SWMS'] - row['Fahrzeuge Alternative Antriebe Elektro'],
      )
    }
  }, [yearIndex, reducedData])

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title as="h5" variant={'primary'}>
            Fahrzeuge mit fossilem Antrieb
          </Title>
          <AnimatedNumber className="text-2xl text-mobility">
            {combustionCount}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5" variant={'primary'}>
            Fahrzeuge mit Elektroantrieb
          </Title>
          <AnimatedNumber className="text-2xl text-mobility">
            {electroCount}
          </AnimatedNumber>
        </div>
      </div>
      <div className="flex h-[280px] w-full items-end rounded bg-white p-4">
        <div
          className="flex-none transition-all"
          style={{
            width: `${
              (combustionCount / (electroCount + combustionCount) || 0.5) * 100
            }%`,
          }}
        >
          <BusCombustion className="w-full" />
        </div>
        <div className="flex-1">
          <BusElectro className="w-full" />
        </div>
      </div>
      {width < 1800 && (
        <MobileSlider
          defaultValue={[0]}
          labels={reducedData.map(e => e.ZEIT.toString())}
          max={reducedData.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          variant={'mobility'}
        />
      )}
      {width >= 1800 && (
        <Slider
          defaultValue={[0]}
          labels={reducedData.map(e => e.ZEIT.toString())}
          max={reducedData.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          variant={'mobility'}
        />
      )}
      <Spacer />
      <Title as="h5">
        Busfahren ist Klimaschutz. Damit die Umweltbilanz des Nahverkehrs noch
        besser wird, setzen wir immer stärker auf Elektrobusse mit Ökostrom im
        Tank. In Münster sind die leisen und abgasfreien Busse bereits seit 2015
        unterwegs und gehören längst zum Stadtbild. Und jedes Jahr werden es
        mehr! Bis 2029 soll unsere Busflotte komplett elektrisch fahren.
      </Title>
    </div>
  )
}

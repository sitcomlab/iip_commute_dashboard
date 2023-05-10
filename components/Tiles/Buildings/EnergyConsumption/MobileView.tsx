import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import {
  Ratsgymnasium,
  SentruperHoehe,
  Stadtbibliothek,
  Stadtweinhaus,
} from '@/components/Icons'
import { SVGProps } from 'react'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import waermeData from '@/assets/data/waerme.json'
import stromData from '@/assets/data/strom.json'
import Carousel from '@/components/Elements/Carousel'

type DataType = {
  Datum: number
  stadtbuecherei: number | null
  sentruper: number | null
  rathaus: number | null
  'freiherr-von-stein': number | null
}

type Building = Omit<DataType, 'Datum'>

const buildings: Record<keyof Building, string> = {
  rathaus: 'Rathaus / Stadtweinhaus',
  stadtbuecherei: 'Stadtbücherei',
  sentruper: 'Sportantlage Sentruper Höhe',
  'freiherr-von-stein': 'Freiherr-von-Stein-Gymnasium',
}

const buildingIcon: Record<
  keyof Building,
  (_props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  stadtbuecherei: Stadtbibliothek,
  sentruper: SentruperHoehe,
  rathaus: Stadtweinhaus,
  'freiherr-von-stein': Ratsgymnasium,
}

function getBuildingIcon(
  building: keyof Building,
  props?: SVGProps<SVGSVGElement>,
) {
  const Icon = buildingIcon[building]
  return <Icon {...props} />
}

function getData(
  mode: 'strom' | 'waerme',
  building: keyof Building,
  year: number,
) {
  const data: DataType[] = mode === 'strom' ? stromData : waermeData

  const filteredYear = data.filter(
    d => year === new Date(d.Datum).getFullYear(),
  )

  return filteredYear.map(d => d[building]).filter(d => d !== null) as number[]
}

function getYearSum(
  mode: 'strom' | 'waerme',
  building: keyof Building,
  year: number,
) {
  const data = getData(mode, building, year)

  return data.reduce((a, b) => a + b, 0)
}

const years = Array.from(
  new Set(stromData.map(d => new Date(d.Datum).getFullYear())),
).sort((a, b) => a - b)

interface MobileViewProps {
  mode: 'strom' | 'waerme'
  yearIndex: number
}

export default function MobileView({ mode, yearIndex }: MobileViewProps) {
  return (
    <Carousel
      arrows
      options={{
        gap: '4rem',
      }}
      pagination
    >
      {Object.keys(buildings).map(building => (
        <div key={building}>
          <div className="flex gap-2">
            <Title as="h4" className="h-20 flex-1" variant="building">
              {buildings[building as keyof Building]}
            </Title>
            <div className="mx-auto flex h-[80px] w-[80px] justify-end">
              {getBuildingIcon(building as keyof Building)}
            </div>
          </div>
          <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
          <div className="h-40 w-full">
            <EnergyConsumptionChart
              data={getData(mode, building as keyof Building, years[yearIndex])}
            />
          </div>
          <LabelSeperator>Jahresverbrauch</LabelSeperator>
          <div className="flex w-full gap-1 p-2">
            <Title as="h3" variant="building">
              <AnimatedNumber decimals={0}>
                {getYearSum(mode, building as keyof Building, years[yearIndex])}
              </AnimatedNumber>
            </Title>
            <Title as="h3" font="normal" variant="building">
              kWh
            </Title>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

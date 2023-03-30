'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import climateIndicesData from '@/assets/data/climate_indices.json'
import { LineSeriesOption } from 'echarts'
import { differenceInYears, parse } from 'date-fns'
import Switch from '@/components/Inputs/Switch'
import { Eis, Frost, Heiss, Sommer, Tropen } from '@/components/Icons'
import Title from '@/components/Elements/Title'
import { ForwardRefExoticComponent, SVGProps, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

const { theme } = resolveConfig(tailwindConfig)

type IndicesTypes =
  | 'eistage'
  | 'frosttage'
  | 'heisse_tage'
  | 'sommertage'
  | 'tropennaechte'

type ClimateIndex = {
  dwd_station_id: number
  eistage: number
  frosttage: number
  heisse_tage: number
  observation_type: string
  sommertage: number
  timestamp: string
  tropennaechte: number
}

const TIME_DELTA_IN_YEARS = 20

const data = climateIndicesData as ClimateIndex[]
const getSeries = (property: keyof ClimateIndex) =>
  data
    .filter(
      e =>
        differenceInYears(
          new Date(),
          parse(e.timestamp, 'yyyy-MM-dd HH:mm:ssXXX', new Date()),
        ) <= TIME_DELTA_IN_YEARS,
    )
    .map(e => [
      parse(e.timestamp, 'yyyy-MM-dd HH:mm:ssXXX', new Date()),
      e[property],
    ])

/**
 * All the indices that are on the chart
 */
const indices: Record<
  IndicesTypes,
  {
    title: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    seriesOption: LineSeriesOption
  }
> = {
  heisse_tage: {
    title: 'Heiße Tage (>= 30°C)',
    icon: Heiss,
    seriesOption: {
      name: 'Heiße Tage',
      data: getSeries('heisse_tage'),
      // @ts-ignore
      color: theme?.colors?.energy.DEFAULT || '#6060d6',
    },
  },
  sommertage: {
    title: 'Sommertage (>= 25°C)',
    icon: Sommer,
    seriesOption: {
      name: 'Sommertage',
      data: getSeries('sommertage'),
      // @ts-ignore
      color: theme?.colors?.mobility.DEFAULT || '#6060d6',
    },
  },
  tropennaechte: {
    title: 'Tropennächte (>= 20°C)',
    icon: Tropen,
    seriesOption: {
      name: 'Tropennächte',
      data: getSeries('tropennaechte'),
      // @ts-ignore
      color: theme?.colors?.buildings.DEFAULT || '#6060d6',
    },
  },
  frosttage: {
    title: 'Frosttage (mind. < 0°C)',
    seriesOption: {
      name: 'Frosttage',
      data: getSeries('frosttage'),
      // @ts-ignore
      color: theme?.colors?.primary.DEFAULT || '#6060d6',
    },
    icon: Frost,
  },
  eistage: {
    title: 'Eistage (max. < 0°C)',
    icon: Eis,
    seriesOption: {
      name: 'Eistage',
      data: getSeries('eistage'),
      // @ts-ignore
      color: theme?.colors?.climate.DEFAULT || '#6060d6',
    },
  },
}

/**
 *
 * @param type: the type of the icon
 * @param onChange: on toggle change
 * @returns Toggle with Icon and text
 */
function ClimateIndiceToggle({
  type,
  onChange,
}: {
  type: IndicesTypes
  onChange?: (_checked: boolean) => void
}) {
  const Icon = indices[type].icon
  return (
    <div className="flex w-max items-center gap-4">
      <Switch onCheckedChange={onChange} variant={type} />
      <Icon className="aspect-square h-8" />
      <Title as="h5" variant={type}>
        {indices[type].title}
      </Title>
    </div>
  )
}

/**
 *
 * @returns The Climate Indices Chart
 */
export default function ClimateIndicesChart() {
  const [seriesVisible, setSeriesVisible] = useState<
    Record<IndicesTypes, boolean>
  >({
    eistage: false,
    frosttage: false,
    heisse_tage: false,
    sommertage: false,
    tropennaechte: false,
  })

  const series: LineSeriesOption[] = Object.keys(indices)
    .filter(e => seriesVisible[e as IndicesTypes])
    .map(e => ({
      ...indices[e as IndicesTypes].seriesOption,
      type: 'line',
      itemStyle: {
        opacity: 0,
      },
    }))

  return (
    <div className="flex h-full w-full items-center p-5">
      <div className="h-full flex-1">
        <Title as="h7">Anzahl der Tage</Title>
        <ReactECharts
          option={{
            series,
            xAxis: {
              type: 'time',
            },
            yAxis: {
              type: 'value',
              interval: 5,
            },
            animation: true,
          }}
          settings={{
            notMerge: true,
          }}
        />
      </div>
      <div className="flex h-full flex-col justify-evenly">
        <ClimateIndiceToggle
          onChange={c => setSeriesVisible({ ...seriesVisible, heisse_tage: c })}
          type="heisse_tage"
        />
        <ClimateIndiceToggle
          onChange={c => setSeriesVisible({ ...seriesVisible, sommertage: c })}
          type="sommertage"
        />
        <ClimateIndiceToggle
          onChange={c =>
            setSeriesVisible({ ...seriesVisible, tropennaechte: c })
          }
          type="tropennaechte"
        />
        <ClimateIndiceToggle
          onChange={c => setSeriesVisible({ ...seriesVisible, frosttage: c })}
          type="frosttage"
        />
        <ClimateIndiceToggle
          onChange={c => setSeriesVisible({ ...seriesVisible, eistage: c })}
          type="eistage"
        />
      </div>
    </div>
  )
}

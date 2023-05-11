'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import Title from '@/components/Elements/Title'

// @ts-ignore
import StromerzeugungBereitstellung from '@/assets/data/Stromerzeugung_bereitstellung.csv'
// @ts-ignore
import Stromemissionen from '@/assets/data/stromemissionen.csv'

type StromDataType = {
  Jahr: number
  'GUD (Erdgas)': number
  'reg. Bezug (Bundesmix)': number
  Windkraft: number
  'Anteil EE (%)': number
  'PV,Biogas': number
  'Stromverbrauch ges.': number
  'BHKW (Erdgas)': number
  'Klär-Deponiegas': number
  Wasserkraft: number
  'BHKW (Biomethan)': number
}

export default function EnergietraegerChart() {
  const [yearIndex, setYearIndex] = useState(0)

  const [mode, setMode] = useState<'stromerzeugung' | 'stromemissionen'>(
    'stromerzeugung',
  )

  const data: StromDataType[] =
    mode === 'stromerzeugung' ? StromerzeugungBereitstellung : Stromemissionen

  return (
    <div className="flex h-full flex-col">
      <ToggleGroup
        items={[
          {
            element: (
              <Title as="h5" className="md:mx-auto md:w-max">
                Anteilige Stromerzeugung
              </Title>
            ),
            value: 'stromerzeugung',
          },
          {
            element: (
              <Title as="h5" className="md:mx-auto md:w-max">
                CO₂ pro Energieträger
              </Title>
            ),
            value: 'co2',
          },
        ]}
        onChange={val => setMode(val as typeof mode)}
        variant={'primary'}
      />
      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex-1">
          <ReactECharts
            option={{
              series: [
                {
                  type: 'treemap',
                  breadcrumb: {
                    show: false,
                  },
                  itemStyle: {
                    gapWidth: 4,
                  },
                  label: {
                    position: ['0%', '100%'],
                    offset: [0 + 8, -70 - 8],
                    distance: 10,
                    formatter(params) {
                      const percent =
                        // @ts-ignore
                        params.value / params.treeAncestors[0].value

                      if (percent < 0.05) {
                        return ''
                      }

                      return `{name|${params.name}}\n{value|${(
                        percent * 100
                      ).toFixed(0)}%}`
                    },
                    rich: {
                      name: {
                        padding: [0, 0, 4, 0],
                      },
                      value: {
                        fontSize: 40,
                      },
                    },
                  },
                  roam: false,
                  nodeClick: undefined,
                  levels: [
                    {
                      itemStyle: {
                        color: '#f28443',
                      },
                    },
                  ],
                  data: Object.keys(data[yearIndex])
                    .filter(
                      k =>
                        ![
                          'Jahr',
                          'Stromverbrauch ges.',
                          'Emissionen ges.',
                          'Anteil EE an Gesamtemissionen (%)',
                          'Anteil EE (%)',
                          'reg. Bezug (Bundesmix)',
                        ].includes(k),
                    )
                    .map(key => ({
                      name: key,
                      value: data[yearIndex][key as keyof StromDataType],
                    })),
                },
              ],
            }}
          />
        </div>
        <Slider
          defaultValue={[0]}
          labels={data.map(e => e.Jahr.toString())}
          max={data.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          variant={'energy'}
        />
      </div>
    </div>
  )
}

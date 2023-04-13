'use client'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import useGarbageData from '@/hooks/useGarbageData'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import { SeriesOption } from 'echarts'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { TrashGesamt, TrashWertstoffe } from '@/components/Icons'

const { theme } = resolveConfig(tailwindConfig)

function getSeries(name: string, data: any[], color: string): SeriesOption {
  return {
    name,
    type: 'line',
    stack: 'Total',
    areaStyle: {
      color,
      opacity: 0.23,
    },
    lineStyle: {
      color,
      width: 4,
    },
    itemStyle: {
      opacity: 0,
    },
    emphasis: {
      focus: 'series',
    },
    data,
  }
}

/**
 *
 * @returns The Garbage Chart
 */
export default function GarbageChart() {
  const data = useGarbageData()

  const totalData = data.filter(
    e => e.KATEGORIE === 'Abfallaufkommen in kg pro Einwohner/Jahr Gesamt',
  )
  const wertstoffeData = data.filter(
    e => e.KATEGORIE === 'Wertstoffe in kg pro Einwohner/Jahr',
  )

  const years = wertstoffeData.map(e => e.JAHR.toString())

  const [yearIndex, setYearIndex] = useState(0)

  return (
    <div className="flex h-full w-full items-center p-5">
      <div className="h-full flex-1">
        <ReactECharts
          option={{
            series: [
              getSeries(
                'Wertstoffe',
                wertstoffeData.map(e => e.WERT),
                // @ts-ignore
                theme?.colors?.energy.DEFAULT || '#f28443',
              ),
              getSeries(
                'Gesamt',
                totalData.map(e => e.WERT),
                // @ts-ignore
                theme?.colors?.mobility.DEFAULT || '#34c17b',
              ),
            ],
            xAxis: [
              {
                type: 'category',
                data: wertstoffeData.map(e => e.JAHR),
                show: false,
              },
            ],
            yAxis: {
              type: 'value',
              interval: 200,
            },
            animation: true,
          }}
          settings={{
            notMerge: true,
          }}
        />
        <div className="flex w-full -translate-y-10 gap-12 pl-20 pr-40">
          <Title as={'h5'} variant={'primary'}>
            Jahr
          </Title>
          <div className="flex-1">
            <Slider
              defaultValue={[yearIndex]}
              labels={years}
              max={years.length - 1}
              min={0}
              onValueChange={([e]) => {
                setYearIndex(e)
              }}
              variant={'climate'}
            />
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col justify-evenly">
        <div className="flex w-48 items-center gap-2">
          <TrashGesamt className="h-14" />
          <div>
            <Title as={'h5'} variant={'primary'}>
              Gesamt
            </Title>
            <Title as={'h3'} variant={'primary'}>
              <AnimatedNumber>
                {totalData.find(e => e.JAHR.toString() === years[yearIndex])
                  ?.WERT ?? 0}
              </AnimatedNumber>
              kg
            </Title>
          </div>
        </div>
        <div className="flex w-48 items-center gap-2">
          <TrashWertstoffe className="h-14 text-energy" />
          <div>
            <Title as={'h5'} variant={'primary'}>
              Wertstoffe
            </Title>
            <Title as={'h3'} variant={'primary'}>
              <AnimatedNumber>
                {wertstoffeData.find(
                  e => e.JAHR.toString() === years[yearIndex],
                )?.WERT ?? 0}
              </AnimatedNumber>
              kg
            </Title>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import useGarbageData from '@/hooks/useGarbageData'
import { SeriesOption } from 'echarts'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { TrashGesamt, TrashWertstoffe } from '@/components/Icons'
import MobileSlider from '@/components/Inputs/MobileSlider'
import { useWindowSize } from 'react-use'
import Slider from '@/components/Inputs/Slider'
import { ReactECharts } from '@/components/Charts/ReactECharts'

const { theme } = resolveConfig(tailwindConfig)

function getSeries(name: string, data: any[], color: string): SeriesOption {
  return {
    name,
    type: 'line',
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

  const { width } = useWindowSize()

  const totalData = data.filter(
    e => e.KATEGORIE === 'Abfallaufkommen in kg pro Einwohner/Jahr Gesamt',
  )
  const wertstoffeData = data.filter(
    e => e.KATEGORIE === 'Wertstoffe in kg pro Einwohner/Jahr',
  )

  const years = wertstoffeData.map(e => e.JAHR.toString())

  const [yearIndex, setYearIndex] = useState(0)

  return (
    <div className="flex h-full w-full flex-col-reverse items-center 2xl:flex-row">
      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex h-full w-full flex-1 items-center">
          <ReactECharts
            option={{
              grid: {
                top: 20,
                left: 60,
                bottom: 20,
                right: 20,
              },
              series: [
                getSeries(
                  'Gesamt',
                  totalData.map(e => e.WERT),
                  // @ts-ignore
                  theme?.colors?.mobility.DEFAULT || '#34c17b',
                ),
                getSeries(
                  'Wertstoffe',
                  wertstoffeData.map(e => e.WERT),
                  // @ts-ignore
                  theme?.colors?.energy.DEFAULT || '#f28443',
                ),
              ],
              xAxis: [
                {
                  type: 'category',
                  data: wertstoffeData.map(e => e.JAHR),
                  show: false,
                  axisLabel: {
                    fontSize: 20,
                  },
                },
              ],
              yAxis: {
                type: 'value',
                interval: 100,
                axisLabel: {
                  fontSize: 20,
                },
              },
              animation: true,
            }}
            settings={{
              notMerge: true,
            }}
            style={{
              height: width < 1024 ? '200px' : '100%',
              width: '100%',
            }}
          />
        </div>
        <div className="mt-4 flex w-full gap-4 py-4 md:gap-12 md:pl-4 md:pr-16">
          <Title as={'h5'} variant={'primary'}>
            Jahr
          </Title>
          <div className="flex-1">
            {width < 1800 && (
              <MobileSlider
                defaultValue={[yearIndex]}
                labels={years}
                max={years.length - 1}
                min={0}
                onValueChange={([e]) => {
                  setYearIndex(e)
                }}
                variant={'climate'}
              />
            )}
            {width >= 1800 && (
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
            )}
          </div>
        </div>
      </div>
      <div className="flex h-fit flex-row justify-evenly gap-4 overflow-hidden pb-8 pt-2 md:gap-0 2xl:h-full 2xl:flex-col 2xl:pb-0 2xl:pt-0">
        <div className="flex h-fit items-center gap-2 md:w-48">
          <TrashGesamt className="h-10 md:h-14" />
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
        <div className="flex h-fit items-center gap-2 md:w-48">
          <TrashWertstoffe className="h-10 text-energy md:h-14" />
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

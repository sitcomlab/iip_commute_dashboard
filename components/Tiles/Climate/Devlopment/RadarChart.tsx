'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { useEffect, useState } from 'react'

export default function RadarChart({
  data,
}: {
  data: {
    [x: string]: {
      [key: number]: number
    }
  }
}) {
  const [years, setYears] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setCounter(prevCounter => prevCounter + 1),
      200,
    )

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const allYears = Object.keys(data)
    if (counter >= allYears.length) {
      setCounter(0)
      setYears([])
      return
    }
    const newYear = allYears[counter]
    setYears([...years, newYear])
  }, [counter])

  useEffect(() => {
    const mySeriesData = years?.slice(-10).map(y => {
      const year = data[y]
      return {
        value: Object.keys(year)
          .map(m => year[Number(m)])
          .reverse(),
        name: y,
        areaStyle: {
          color: '#14b3d9',
          opacity: 0.1,
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          opacity: 0,
        },
      }
    })
    setSeriesData(mySeriesData)
  }, [years])

  return (
    <div className="relative h-full w-full">
      <div className="absolute flex h-full w-full items-center justify-center">
        <p className="z-10 text-2xl">{years[years.length - 1]}</p>
      </div>

      <ReactECharts
        option={{
          animation: false,
          radar: {
            splitLine: {
              show: false,
            },
            splitArea: {
              areaStyle: {
                color: ['#14b3d91f'],
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            shape: 'circle',
            indicator: [
              { name: 'Jan', min: -5, max: 5 },
              { name: 'Feb', min: -5, max: 5 },
              { name: 'Mar', min: -5, max: 5 },
              { name: 'Apr', min: -5, max: 5 },
              { name: 'May', min: -5, max: 5 },
              { name: 'Jun', min: -5, max: 5 },
              { name: 'Jul', min: -5, max: 5 },
              { name: 'Aug', min: -5, max: 5 },
              { name: 'Sep', min: -5, max: 5 },
              { name: 'Oct', min: -5, max: 5 },
              { name: 'Nov', min: -5, max: 5 },
              { name: 'Dec', min: -5, max: 5 },
            ].reverse(),
          },
          series: {
            name: 'Climate',
            type: 'radar',
            data: seriesData,
          },
        }}
        renderer="canvas"
      />
    </div>
  )
}

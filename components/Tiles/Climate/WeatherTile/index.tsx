'use client'

import { SunLarge } from '@/components/Icons'
import Slider from '@/components/Inputs/Slider'
import useWeather from '@/hooks/useWeather'
import { conditionMapping } from '@/lib/brightsky'
import { addHours, format } from 'date-fns'
import { useState } from 'react'
import ClimateTile from '../ClimateTile'
import Phenomenon from './Phenomenon'

export default function WeatherTile() {
  const [timestamp, setTimestamp] = useState(new Date())

  const weather = useWeather({ lat: 52, lng: 7.6 }, timestamp)

  const nextHours = new Array(6).fill(undefined).map((e, i) => {
    const date = new Date()
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return addHours(date, i)
  })

  return (
    <ClimateTile
      dataSource="DWD"
      embedId={'wetter'}
      live
      title={
        <span>
          <span className="font-medium">Wetter</span> aktuell
        </span>
      }
    >
      <div>
        {weather && (
          <div className="mb-8 flex space-x-4">
            <div className="flex flex-1 flex-col justify-between">
              <span>
                <SunLarge className="h-24 text-primary" />
              </span>
              <p className="my-4 text-xl">
                In Münster ist es gerade{' '}
                <span className="text-climate">
                  {conditionMapping[weather?.condition]}
                </span>
              </p>
              <Phenomenon
                phenomenon="temperature"
                size="xl"
                value={weather?.temperature}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <Phenomenon
                phenomenon="precipitation"
                value={weather?.precipitation}
              />
              <Phenomenon
                phenomenon="cloudcover"
                value={weather?.cloud_cover}
              />
              <Phenomenon phenomenon="windspeed" value={weather?.wind_speed} />
              {/* <Phenomenon phenomenon="sunhours" value={weather?.sunshine} /> */}
            </div>
          </div>
        )}
        <Slider
          defaultValue={[0]}
          labels={(() => {
            const labels = nextHours.map(d => format(d, 'kk:mm'))
            labels[0] = 'jetzt'
            return labels
          })()}
          max={nextHours.length - 1}
          min={0}
          onValueChange={([e]) => {
            setTimestamp(nextHours[e])
          }}
        />
      </div>
    </ClimateTile>
  )
}

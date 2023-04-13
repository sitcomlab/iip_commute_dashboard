'use client'

import Title from '@/components/Elements/Title'
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
      moreInfo="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dol."
      title={
        <span>
          <span className="font-medium">Wetter</span> aktuell
        </span>
      }
    >
      <div>
        {weather && (
          <div className="mb-8 flex gap-4">
            <div className="flex flex-1 flex-col justify-between gap-2">
              <span>
                <SunLarge className="h-36 text-primary" />
              </span>
              <Title as={'h4'} className="my-4 w-3/4">
                In Münster ist es gerade{' '}
                <span className="text-climate">
                  {conditionMapping[weather?.condition]}
                </span>
              </Title>
              <Phenomenon
                phenomenon="temperature"
                size="xl"
                value={weather?.temperature}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6">
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
          variant={'climate'}
        />
      </div>
    </ClimateTile>
  )
}

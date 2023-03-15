'use client'

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import { useBicycleCount } from '@/hooks/useBicycleCount'
import { format, subDays } from 'date-fns'
import { useState } from 'react'
import BicycleRow from './BicycleRow'
import LoadingRow from './LoadingRow'

export default function BicycleChartTile() {
  const lastDays = new Array(7)
    .fill(undefined)
    .map((e, i) => subDays(new Date(), i + 1))
    .reverse()

  const [date, setDate] = useState<Date>(lastDays[lastDays.length - 1])

  const { data, min, max, stationCount } = useBicycleCount(date)

  const loading = !data

  return (
    <MobilityTile
      dataSource="Stadt Münster - Amt für Mobilität und Tiefbau"
      embedId="radlerinnen"
      live
      subtitle="im Stadtgebiet"
      title="Radler:innen"
    >
      <>
        <div className="rounded bg-white px-4 py-2">
          {loading &&
            new Array(stationCount)
              .fill(undefined)
              .map((_e, i) => <LoadingRow key={i} />)}
          {data &&
            data.map(e => (
              <BicycleRow
                count={e.count}
                key={e.id}
                max={max}
                min={min}
                name={e.name}
              />
            ))}
        </div>
        <Spacer size="sm" />
        {lastDays.length > 0 && (
          <Slider
            defaultValue={[lastDays.length - 1]}
            labels={lastDays.map(d => format(d, 'dd.MM.'))}
            max={lastDays.length - 1}
            min={0}
            onValueChange={([e]) => {
              setDate(lastDays[e])
            }}
          />
        )}
        <Spacer size={'sm'} />
        <Title as="h5">
          An verschiedenen Zählstellen in der Stadt wird die Anzahl an
          vorbeiradelnden Radfahrer*innen gemessen. Seit Jahren werden es stetig
          mehr. Diese Zahlen sind wichtig für die Stadtplanung und weisen u.a.
          auf einen Ausbaubedarf bei Radwegen und Velorouten hin.
        </Title>
      </>
    </MobilityTile>
  )
}

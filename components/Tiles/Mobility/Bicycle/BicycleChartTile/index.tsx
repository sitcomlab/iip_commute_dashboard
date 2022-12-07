'use client'

import { Spacer } from '@/components/Elements/Spacer'
import Slider from '@/components/Inputs/Slider'
import MobilityTile from '@/components/Tiles/Base/MobilityTile'
import { useBicycleCount } from '@/hooks/useBicycleCount'
import { format, subDays } from 'date-fns'
import { useState } from 'react'
import BicycleRow from './BicycleRow'

export default function BicycleChartTile() {
  const lastDays = new Array(7)
    .fill(undefined)
    .map((e, i) => subDays(new Date(), i + 1))
    .reverse()

  const [date, setDate] = useState<Date>(lastDays[lastDays.length - 1])

  const { data, min, max } = useBicycleCount(date)

  return (
    <MobilityTile live subtitle="im Stadtgebiet" title="Radler:innen">
      <>
        <div className="rounded bg-white px-4 py-2">
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
      </>
    </MobilityTile>
  )
}

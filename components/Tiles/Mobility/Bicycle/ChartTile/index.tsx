'use client'

import Slider from '@/components/Inputs/Slider'
import MobilityTile from '@/components/Tiles/Base/MobilityTile'
import { format, subDays } from 'date-fns'
import { useState } from 'react'
import BicycleProgress from './BicycleProgress'

export default function ChartTile() {
  const lastDays = new Array(7)
    .fill(undefined)
    .map((e, i) => subDays(new Date(), i))
    .reverse()

  const [mockVal, setMockVal] = useState(0)

  return (
    <MobilityTile live subtitle="im Stadtgebiet" title="Radler:innen">
      <>
        <div className="bg-white p-4">
          <BicycleProgress progress={mockVal * 100} />
          <BicycleProgress progress={mockVal * 100} />
          <BicycleProgress progress={mockVal * 100} />
          <BicycleProgress progress={mockVal * 100} />
        </div>
        {lastDays.length > 0 && (
          <Slider
            defaultValue={[0]}
            labels={lastDays.map(d => format(d, 'dd.MM.'))}
            max={lastDays.length - 1}
            min={0}
            onValueChange={([e]) => {
              setMockVal(e / (lastDays.length - 1))
            }}
          />
        )}
      </>
    </MobilityTile>
  )
}

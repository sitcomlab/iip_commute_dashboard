'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { PVAnlageMuenster } from '@/components/Icons'

// @ts-ignore
import PVData from '@/assets/data/pv-anlagen.csv'
import { PVAnlagenDataType } from '.'

export default function PVAnlagenContent() {
  const [data] = PVData as PVAnlagenDataType[]

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <PVAnlageMuenster className="h-20 text-energy md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as={'subtitle'}>
            sind im Moment auf Gebäuden der Stadtverwaltung installiert. Das
            entspricht einer Leistung von{' '}
            <span className="text-energy">
              <AnimatedNumber decimals={2}>{data.Leistung}</AnimatedNumber> MW.
            </span>{' '}
          </Title>
        </div>
      </div>
    </div>
  )
}

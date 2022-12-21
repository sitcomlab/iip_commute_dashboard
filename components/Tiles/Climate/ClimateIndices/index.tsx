'use client'

import { format } from 'date-fns'
import ClimateTile from '../ClimateTile'
import ClimateIndicesChart from './ClimateIndicesChart'

export default function ClimateIndicesTile() {
  return (
    <ClimateTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      dataSource="DWD"
      embedId="klimakenntage"
      title="Klimakenntage"
    >
      <div className="h-80 rounded bg-white">
        <ClimateIndicesChart />
      </div>
    </ClimateTile>
  )
}

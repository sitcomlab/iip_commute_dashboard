import BuildingTile from '../BuildingsTile'

import EcoProfitData from '@/assets/data/ecoprofit.json'
import { format } from 'date-fns'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

interface IEcoProfitData {
  companiesTotal: number
  savingsEuro: number
  savingsCO2: number
  companiesStartupConsulting: number
  updatedAt: string
}

export default function EcoProfitTile() {
  const {
    companiesTotal,
    savingsEuro,
    savingsCO2,
    companiesStartupConsulting,
    updatedAt,
  } = EcoProfitData as IEcoProfitData

  return (
    <BuildingTile
      dataRetrieval={format(new Date(updatedAt), 'dd.MM.yyyy')}
      dataSource="Stadt Münster"
      embedId={'ecoProfit'}
    >
      <div className="flex flex-col gap-4 font-medium md:gap-8">
        <div>
          <p className="mb-2 text-2xl font-light text-buildings md:text-5xl">
            <AnimatedNumber className="font-medium">
              {companiesTotal}
            </AnimatedNumber>{' '}
            Unternehmen
          </p>
          <p>
            Haben bereits am Ökoprofit-Projekt teilgenommen und gemeinsam{' '}
            <span className="text-buildings">
              <AnimatedNumber decimals={1}>{savingsEuro}</AnimatedNumber> Mio
              Euro
            </span>{' '}
            und{' '}
            <span className="text-buildings">
              <AnimatedNumber>{savingsCO2}</AnimatedNumber> t CO2
            </span>{' '}
            eingespart.
          </p>
        </div>
        <div>
          <p className="mb-2 text-2xl font-light text-buildings md:text-5xl">
            <AnimatedNumber className="font-medium">
              {companiesStartupConsulting}
            </AnimatedNumber>{' '}
            Unternehmen
          </p>
          <p>
            Haben zudem bereits die &quot;Startberatung Energieeffizienz&quot;
            in Anspruch genommen.
          </p>
        </div>
      </div>
    </BuildingTile>
  )
}

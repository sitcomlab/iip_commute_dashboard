import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { Co2City } from '@/components/Icons'
import ClimateTile from '../ClimateTile'
import CO2EmissionsContent from './CO2EmissionsContent'

export default function CO2EmissionsTile() {
  return (
    <ClimateTile
      dataRetrieval="01.01.2022"
      dataSource="Stadt Münster - Koordinierungsstelle für Klima und Energie"
      embedId="climate-co2"
      subtitle="So viel wird in Münster ausgestoßen"
      title={'CO₂'}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <CO2EmissionsContent />
        </div>
        <div className="flex w-96 flex-none flex-col items-center justify-between py-4 md:px-8 md:py-0">
          <Title as="h5" variant={'dark'}>
            Trotz einer wachsenden Zahl von Einwohner*innen sinkt die Kurve der
            CO₂-Emissionen in Münster. Das zeigt: Münsteraner*innen setzen mehr
            und mehr Klimaschutz-Maßnahmen um. Mit dem Ziel der Klimaneutralität
            bis 2030 soll die Kurve nun nochmals deutlich steiler sinken.
          </Title>
          <Spacer />
          <Co2City className="mx-auto w-40" />
        </div>
      </div>
    </ClimateTile>
  )
}

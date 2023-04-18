import ClimateTile from '../ClimateTile'
import GarbageChart from './GarbageChart'

export default function GarbageTile() {
  return (
    <ClimateTile
      dataRetrieval={'01.01.2022'}
      dataSource="awm"
      embedId="climate-garbage"
      subtitle={
        'So viel KG Abfall wurden bisher in Münster pro Einwohner:in produziert'
      }
      title="Abfall pro Kopf"
    >
      <div className="h-[30rem] rounded bg-white">
        <GarbageChart />
      </div>
    </ClimateTile>
  )
}

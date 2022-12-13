import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import ChartContainer from './ChartContainer'

export default function StadtradelnTile() {
  return (
    <MobilityTile
      dataRetrieval="01.01.2022"
      dataSource="Stadtradeln"
      subtitle="auf der Überholspur"
      title="Stadtradeln"
    >
      <ChartContainer />
      <p className="my-2 font-medium">
        Auf die Leeze, fertig, los! Für mehr Radverkehr, Klimaschutz und
        Lebensqualität in die Pedale treten: Seit 2020 beteiligt sich die Stadt
        Münster an der jährlich stattfindenden, dreiwöchigen bundesweiten Aktion
        „Stadtradeln“ des globalen Netzwerks „Klima-Bündnis“.
      </p>
    </MobilityTile>
  )
}

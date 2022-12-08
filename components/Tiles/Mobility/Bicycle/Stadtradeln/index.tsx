import MobilityTile from '@/components/Tiles/Base/MobilityTile'
import ChartContainer from './ChartContainer'

export default function StadtradelnTile() {
  return (
    <MobilityTile subtitle="auf der Überholspur" title="Stadtradeln">
      <ChartContainer />
      <p className="prose my-2 font-semibold">
        Auf die Leeze, fertig, los! Für mehr Radverkehr, Klimaschutz und
        Lebensqualität in die Pedale treten: Seit 2020 beteiligt sich die Stadt
        Münster an der jährlich stattfindenden, dreiwöchigen bundesweiten Aktion
        „Stadtradeln“ des globalen Netzwerks „Klima-Bündnis“.
      </p>
    </MobilityTile>
  )
}

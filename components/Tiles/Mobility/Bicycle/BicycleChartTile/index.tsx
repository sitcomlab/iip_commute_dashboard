import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import BicycleChartContent from './BicycleChartContent'

export default function BicycleChartTile() {
  return (
    <MobilityTile
      dataSource="Stadt Münster - Amt für Mobilität und Tiefbau"
      embedId="mobility-bicycle"
      live
      subtitle="im Stadtgebiet"
      title="Radler:innen"
    >
      <>
        <BicycleChartContent />
        <Spacer size={'lg'} />
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

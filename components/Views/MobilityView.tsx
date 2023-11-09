import Columns from '../Layout/Columns'
import BusTile from '../Tiles/Mobility/Bus'
import ModalSplitTile from '../Tiles/Mobility/ModalSplit'
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import BaseView from './BaseView'


export default function MobilityView() {
  return (
    <BaseView type="mobility">
      <BikeInfrastructTile city="muenster" />
      <Columns>

        <BusTile />

      </Columns>

      <ModalSplitTile />

    </BaseView>
  )
}

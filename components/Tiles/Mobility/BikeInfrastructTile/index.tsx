import { format } from 'date-fns'
import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import getTileData from '@/lib/api/getTileData'

//this is necessary to prevent "window is not defined" error
import dynamic from 'next/dynamic';
const BikeInfrastructTileContent = dynamic(() => import('./BikeInfrastructTileContent'), { ssr: false })
//import MapTileContent from './MapTileContent'

export default async function bikeInfrastructTile() {
    const data = await getTileData('mobility-trafficload')
    const infoText = data?.info ?? ''

    const endIndex = infoText.indexOf('nehmen.')
    const firstParagraph = infoText.slice(0, endIndex + 7)
    const secondParagraph = infoText.slice(endIndex + 7)

    return (
        <MobilityTile
            dataRetrieval={format(new Date(), '01.MM.yyyy')}
            dataSource="OpenStreetMap Contributors"
            embedId="mobility-maptile"
            //subtitle="Anzahl gezählter Fahrzeuge an Werktagen"
            title={'Fahrradinfrastruktur'}
        >
            <BikeInfrastructTileContent />
        </MobilityTile>
    )
}4
//'use client'
import { format } from 'date-fns'
import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import getTileData from '@/lib/api/getTileData'

import CityViewConfig from '@/components/Views/CityViewConfig'

//this is necessary to prevent "window is not defined" error
import dynamic from 'next/dynamic';
const BikeInfrastructTileContent = dynamic(() => import('./BikeInfrastructTileContent'), { ssr: false })
//import MapTileContent from './MapTileContent'


export default async function BikeInfrastructTile(props) {
    const cityConfig = CityViewConfig[props.city] || '';
    const embedID = `mobility-bike-${props.city}`;


    return (
        <MobilityTile
            dataRetrieval={format(new Date(), '01.MM.yyyy')}
            dataSource="OpenStreetMap Contributors"
            embedId={embedID}
            subtitle={cityConfig.name || ''}

            //use props to display current city
            title={'Fahrradinfrastruktur'}
        >
            <BikeInfrastructTileContent city={props.city}/>
        </MobilityTile>
    )
}4
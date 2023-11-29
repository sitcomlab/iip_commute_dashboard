import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import WeatherTileContent from './weatherTileContent'

export default async function WeatherTile(props: {lat: string; lon: string}) {
    return(
        <MobilityTile
            dataSource="OpenWeatherMap (for now)"
            embedId="mobility-weatherTile"
            title={'Wetter'}
        >
            <WeatherTileContent
                lat={props.lat}
                lon={props.lon}
            >

            </WeatherTileContent>
        </MobilityTile>
    )
}
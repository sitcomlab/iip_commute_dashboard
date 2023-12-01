import IconTile from '../../Base/IconTile';
import WeatherTileContent from './weatherTileContent'
import { Cloud } from '@/components/Icons';

export default async function WeatherTile(props: {lat: string; lon: string}) {
    return(
        <IconTile
            dataSource="OpenWeatherMap (for now)"
            embedId="mobility-weatherTile"
            icon={Cloud}
            title={'Wetter'}
        >
            <WeatherTileContent
                lat={props.lat}
                lon={props.lon}
            />
        </IconTile>
    )
}
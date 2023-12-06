import IconTile from '../../Base/IconTile';
import WeatherTileContent from './weatherTileContent'
import { Cloud } from '@/components/Icons';

import CityViewConfig from '@/components/Views/CityViewConfig';

export default async function WeatherTile(props: {city: string, lat: string, lon: string}) {
    const cityConfig = CityViewConfig[props.city] || '';
    const embedId = `mobility-bike-${props.city}`;
    
    return(
        <IconTile
            dataSource="OpenWeatherMap (for now)"
            embedId={embedId}
            icon={Cloud}
            subtitle={cityConfig.name || ''}
            title={'Wetter'}
        >
            <WeatherTileContent
                lat={String(cityConfig.mapSettings.center[0])}
                lon={String(cityConfig.mapSettings.center[1])}
            />
        </IconTile>
    )
}
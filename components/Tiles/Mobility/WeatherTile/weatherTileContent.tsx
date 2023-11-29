'use client'

import useWeatherData from '@/hooks/useWeatherData';

function WeatherTileContent(props: {lat: string; lon: string}){
    var weatherData = useWeatherData(props.lat,props.lon)
    console.log(weatherData)
    return(
        <>
        {'test: lat:'+props.lat+' lon:'+props.lon}
        <div>{JSON.stringify(weatherData)}</div>
        </>
    )
}

export default WeatherTileContent
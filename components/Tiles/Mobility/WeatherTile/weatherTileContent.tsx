'use client'
import Title from '@/components/Elements/Title';
import useWeatherData from '@/hooks/useWeatherData';
import styled from 'styled-components';

import { Temperature } from '@/components/Icons';
import { Eis } from '@/components/Icons';
import { Sun } from '@/components/Icons';
import { Water } from '@mui/icons-material';
import { Cloud } from '@mui/icons-material';
import { EnergyIcon } from '@/components/Icons';


const InlineIcon = styled.span`
    background-color: ${(props) => props.color};
    display: flex;
    height: 100%
`

function toCelsius(kelvin: number){
    const celsius = kelvin-273.15
    return Math.round(celsius*10)/10
}

function getWeatherCondition(weather){
    const wid = weather.weather[0].id
    //see https://openweathermap.org/weather-conditions
    let icon = Sun
    let text = ''
    switch(true){
        case (wid >= 200 && wid <= 232): //thunderstorm
            text = 'Gewitter'
            icon = EnergyIcon
            break;
        case (wid >= 300 && wid <= 321): //drizzle
            text = 'leichter Regen'
            icon = Water
            break;
        case (wid >= 500 && wid <= 531): //rain
            text = 'Regen'
            icon = Water
            break;
        case (wid >= 600 && wid <= 622): //snow
            text = 'Schnee'
            icon = Eis
            break;
        case (wid >= 700 && wid <= 781): //atmosphere (mist / fog)
            text = 'Nebel'
            icon = Cloud;
            break;
        case (wid == 800): //clear
            text = 'klar'
            icon = Sun
            break;
        case (wid >= 801 && wid <= 804): //clouds
            text = 'bewölkt'
            icon = Cloud;
            break;
    }

    return [text, icon]
}

function WeatherTileContent(props: {lat: string; lon: string}){
    var weather = useWeatherData(props.lat,props.lon)
    if(weather == undefined){
        return <></>
    }
    const trueTemp = toCelsius(weather.main.temp)
    const perceivedTemp = toCelsius(weather.main.feels_like)
    const [weatherText, WeatherIcon] = getWeatherCondition(weather)
    console.log(weatherText)

    return(
        <div className="flex" style={{justifyContent: 'space-around'}}>
        <div className="flex flex-col text-primary">
            <div style={{'display': 'flex', 'align-items': 'center'}}>
                <InlineIcon><Temperature /></InlineIcon>
                <Title as="h2">{trueTemp}°C</Title>
            </div>
            <div>feels like: <Title as="h5">{perceivedTemp}°C</Title></div>
        </div>
        <div className="flex flex-col items-end">
            <WeatherIcon />
            <Title as="h4">{weatherText}</Title>
        </div>
        {/* 
        {'test: lat:'+props.lat+' lon:'+props.lon}
        <div>{JSON.stringify(weatherData)}</div>
        */}
        </div>
    )
}

export default WeatherTileContent
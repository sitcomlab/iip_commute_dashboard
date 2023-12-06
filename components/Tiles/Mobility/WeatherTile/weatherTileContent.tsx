'use client'
import Title from '@/components/Elements/Title';
import useWeatherData from '@/hooks/useWeatherData';
import styled from 'styled-components';

import { Temperature } from '@/components/Icons';

const InlineIcon = styled.span`
    background-color: ${(props) => props.color};
    display: flex;
    height: 100%
`

function toCelsius(kelvin: number){
    const celsius = kelvin-273.15
    return Math.round(celsius*10)/10
}

function getWeatherIcon(weather){
    const wid = weather.weather.id
    //see https://openweathermap.org/weather-conditions
    let icon
    switch(true){
        case (wid >= 300): //thunderstorm
            return true;
            break;

    }

    return icon
}

function WeatherTileContent(props: {lat: string; lon: string}){
    var weather = useWeatherData(props.lat,props.lon)
    if(weather == undefined){
        return <></>
    }
    const trueTemp = toCelsius(weather.main.temp)
    const perceivedTemp = toCelsius(weather.main.feels_like)


    return(
        <div className="flex justify">
        <div className="flex flex-col text-primary">
            <div style={{'display': 'flex', 'align-items': 'center'}}>
                <InlineIcon><Temperature /></InlineIcon>
                <Title as="h2">{trueTemp}°C</Title>
            </div>
            <div>feels like: <Title as="h5">{perceivedTemp}°C</Title></div>
        </div>
        <div className="flex flex-col items-end">
        </div>
        {/* 
        {'test: lat:'+props.lat+' lon:'+props.lon}
        <div>{JSON.stringify(weatherData)}</div>
        */}
        </div>
    )
}

export default WeatherTileContent
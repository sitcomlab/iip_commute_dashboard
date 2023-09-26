'use client'

import { createContext } from 'react'
import 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import BicycleInfrastructureData from './BikeInfrastructData'

import CityViewConfig from '@/components/Views/CityViewConfig'


export const CityContext = createContext('muenster')
export default function BikeInfrastructTileContent(props) {
    const city = CityViewConfig[props.city] || CityViewConfig.muenster;

    return (
        <CityContext.Provider value={props.city}>
        <MapContainer
            center={city.mapSettings.center}
            className="h-[75vh] z-0 rounded-3xl"
            scrollWheelZoom={true}

            zoom={city.mapSettings.zoom}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png"
            />
            
            <BicycleInfrastructureData />

        </MapContainer >
        </CityContext.Provider>
    )
}
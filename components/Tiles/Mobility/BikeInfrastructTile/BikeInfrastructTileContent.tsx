'use client'

import 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import BicycleInfrastructureData from './BikeInfrastructData'

export default function BikeInfrastructTileContent() {
    return (
        <MapContainer
            center={[51.962, 7.627]}
            className="h-[75vh] z-0 rounded-3xl"
            scrollWheelZoom={true}

            zoom={12}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png"
            />
            
            <BicycleInfrastructureData />

        </MapContainer >
    )
}
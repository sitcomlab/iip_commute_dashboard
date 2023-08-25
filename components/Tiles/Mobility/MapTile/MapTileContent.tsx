'use client'

import 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function MapTileContent() {
    return (
        <MapContainer center={[51.962, 7.627]} className="h-[75vh] z-0 rounded-3xl" scrollWheelZoom={true} zoom={13} >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png"
            />
            <Marker position={[51.962, 7.627]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer >
    )
}
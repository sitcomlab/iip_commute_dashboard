'use client'

import { createContext, useState } from 'react'
import 'leaflet';
import { MapContainer, Pane, TileLayer } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import BicycleInfrastructureData from './BikeInfrastructData'
import ViewButton from './ViewButton';

import CityViewConfig from '@/components/Views/CityViewConfig'
import { Directions } from '@mui/icons-material';

enum ViewMode {
    AdministrativeAreas = 'Administrative Areas',
    BicycleNetwork = 'Bicycle Network'
}
const MapViewContext = createContext({
    mapViewState: ViewMode.BicycleNetwork,
    setMapViewState: (arg) => {}
  })

const CityContext = createContext('muenster')
function BikeInfrastructTileContent(props) {
    const city = CityViewConfig[props.city] || CityViewConfig.muenster;
    const [mapViewState, setMapViewState] = useState(ViewMode.BicycleNetwork)

    return (
        <MapViewContext.Provider value={{mapViewState, setMapViewState}}>
        <CityContext.Provider value={props.city}>
        {/*buttons here*/}
        <div
            style={{
                display: 'flex', justifyContent: 'end', gap: '10px',
                marginBottom: '10px',     
            }}
            >
            <ViewButton
                type={ViewMode.AdministrativeAreas}
            />
            <ViewButton 
                type={ViewMode.BicycleNetwork}
            />    
        </div> 


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
            <Pane name="popup" style={{ zIndex: 660 }}></Pane>
            <Pane name="tooltip" style={{ zIndex: 670 }}></Pane>

        </MapContainer >
        </CityContext.Provider>
        </MapViewContext.Provider>
    )
}

export { ViewMode, MapViewContext, CityContext}
export default BikeInfrastructTileContent
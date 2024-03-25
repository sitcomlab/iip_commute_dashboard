'use client'

import { createContext, useState } from 'react'
import { atom, RecoilRoot } from 'recoil';
import 'leaflet';
import { MapContainer, Pane, TileLayer } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import BicycleInfrastructureData from './BikeInfrastructData'
import ViewButton from './ViewButton';

import CityViewConfig from '@/components/Views/CityViewConfig'
import AASideView from './PopupInfos/AASideview';

enum ViewMode {
    AdministrativeAreas = 'Administrative Areas',
    BicycleNetwork = 'Bicycle Network',
    PublicTransport = 'Public Transport'
}
const MapViewContext = createContext({
    mapViewState: ViewMode.BicycleNetwork,
    setMapViewState: (_arg: any) => {}
})
const selectedAAFeatureState = atom({
    key: 'selectedAAFeature',
    default: []
})

const CityContext = createContext('muenster')
function BikeInfrastructTileContent(props: { city: string; }) {
    const city = CityViewConfig[props.city] || CityViewConfig.muenster;
    const [mapViewState, setMapViewState] = useState(ViewMode.BicycleNetwork)
    const [map, setMap] = useState(null)

    return (
        <RecoilRoot>
        <MapViewContext.Provider value={{mapViewState, setMapViewState}}>
        <CityContext.Provider value={props.city}>
        {/*Flex container of the two*/}
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            flexWrap: 'wrap-reverse',
            gap: '1em'
            }}>
        
        {/*container of the AA-info-side*/}
        { mapViewState == ViewMode.AdministrativeAreas &&
        
            <AASideView map={map}></AASideView>

        }

        {/*container of the map-side*/}
        <div style={{ 
            flexGrow: 2,
            flexBasis: '60%',
            position: 'relative'
            }}>
        {/*buttons here*/}
        <div
            style={{
                paddingTop:'1rem',
                paddingRight:'1rem',
                display: 'inline-flex', justifyContent: 'end', gap: '10px',
                width: '100%',
                right: 0,
                position: 'absolute',
                zIndex: 1000,
            }}
            >
            <ViewButton
                buttonText={''} 
                mapViewContext={ViewMode.AdministrativeAreas} 
                onClick={function (): void {
                    throw new Error('Function not implemented.');
                } } 
                type={ViewMode.AdministrativeAreas}            
            />
            <ViewButton
                buttonText={''} 
                mapViewContext={ViewMode.BicycleNetwork} 
                onClick={function (): void {
                    throw new Error('Function not implemented.');
                } } 
                type={ViewMode.BicycleNetwork}            
            />
            <ViewButton
                buttonText={''} 
                mapViewContext={ViewMode.PublicTransport} 
                onClick={function (): void {
                    throw new Error('Function not implemented.');
                } } 
                type={ViewMode.PublicTransport}            
            />   
        </div> 


        <MapContainer
            center={city.mapSettings.center}
            className="h-[70vh] z-0 rounded-3xl"
            ref={setMap}
            scrollWheelZoom={true}
            style={{}}
            zoom={city.mapSettings.zoom}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png"
            />
              
            <BicycleInfrastructureData map={map}/>
            <Pane name="popup" style={{ zIndex: 660 }}></Pane>
            <Pane name="tooltip" style={{ zIndex: 670 }}></Pane>

        </MapContainer >
        </div>
        </div>


        </CityContext.Provider>
        </MapViewContext.Provider>
        </RecoilRoot>
    )
}

export { ViewMode, MapViewContext, CityContext, selectedAAFeatureState}
export default BikeInfrastructTileContent
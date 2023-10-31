/* eslint-disable react/jsx-sort-props */
//import React, { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Pane } from 'react-leaflet';

import useBikeInfrastructData from '@/hooks/useBikeInfrastructure';
import LayerControl, { GroupedLayer } from './LayerControl/LayerControl';
import { CityContext, MapViewContext, ViewMode } from './BikeInfrastructTileContent';
import CityViewConfig from '@/components/Views/CityViewConfig';

import AdministrativeAreas from './mapContent/AdministrativeAreas';
import BicycleInfrastructureFeatures from './mapContent/BicycleInfrastructureFeatures';

function BicycleInfrastructureData() {
    //regularly fetch bike infrastructure data
    //  get the city which we are looking at, and pass that to the bike infrastructure hook
    const city = useContext(CityContext) 
    var BicycleInfrastructureData = useBikeInfrastructData(CityViewConfig[city].infrastructureSource)
    const {mapViewState, setMapViewState} = useContext(MapViewContext)

    return (
        <>
            

        {/* Stadtteile */}
        { mapViewState == ViewMode.AdministrativeAreas && 
        <LayerControl position="bottomright">
            <GroupedLayer 
                checked
                group="Stadtteile"
                name="Stadtteile"
            >
            <Pane name="administrativeAreas" style={{ zIndex: 650 }}>
                <AdministrativeAreas 
                    contentGeometry={BicycleInfrastructureData}
                />
            </Pane>

            </GroupedLayer>
            <></>
        </LayerControl>
        }

        { mapViewState == ViewMode.BicycleNetwork &&
        <LayerControl position="bottomright">
            <BicycleInfrastructureFeatures
                contentGeometry={BicycleInfrastructureData}
            />
            <></>
        </LayerControl>
        }
                
        </>
    )
}
        
export default BicycleInfrastructureData
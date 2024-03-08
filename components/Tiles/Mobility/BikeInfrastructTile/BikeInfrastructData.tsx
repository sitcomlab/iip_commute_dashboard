/* eslint-disable react/jsx-sort-props */
//import React, { useEffect, useState } from 'react';

import { useContext } from 'react';

import useBikeInfrastructData from '@/hooks/useBikeInfrastructure';
import LayerControl from './LayerControl/LayerControl';
import { CityContext, MapViewContext, ViewMode } from './BikeInfrastructTileContent';
import CityViewConfig from '@/components/Views/CityViewConfig';

import AdministrativeAreas from './mapContent/AdministrativeAreas';
import BicycleInfrastructureFeatures from './mapContent/BicycleInfrastructureFeatures';
import PublicTransportFeatures from './mapContent/PublicTransportFeatures';
import Legend from './LayerControl/Legend';

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
            <AdministrativeAreas 
                contentGeometry={BicycleInfrastructureData}
            />
            <></>
        </LayerControl>
        }

        { mapViewState == ViewMode.BicycleNetwork &&
        <LayerControl position="bottomright">
            <Legend position='bottomleft'>
                <BicycleInfrastructureFeatures
                    contentGeometry={BicycleInfrastructureData}
                />
                <></>
            </Legend>
            <></>
        </LayerControl>
        }

        { mapViewState == ViewMode.PublicTransport && 
            <LayerControl position="bottomright">
                <Legend position='bottomleft'>
                    <PublicTransportFeatures
                        contentGeometry={BicycleInfrastructureData}
                    />
                    <></>
                </Legend>
                <></>
            </LayerControl>
        }
                
        </>
    )
}
        
export default BicycleInfrastructureData
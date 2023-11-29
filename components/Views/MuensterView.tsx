//import Columns from '../Layout/Columns'
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import BaseView from './BaseView'
import React from 'react';
import WeatherTile from '../Tiles/Mobility/WeatherTile';
//import { useContext, createContext } from 'react'
import CityViewConfig from './CityViewConfig';
import Columns from '../Layout/Columns';

export default function MobilityView() {

  return (

    <BaseView type="münster">
      <BikeInfrastructTile city="muenster"/>
      <Columns>
      <WeatherTile 
        lat={CityViewConfig.muenster.mapSettings.center[0]}
        lon={CityViewConfig.muenster.mapSettings.center[1]}
      ></WeatherTile>
      </Columns>
      
    </BaseView>

  )
}

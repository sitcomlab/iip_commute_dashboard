//import Columns from '../Layout/Columns'
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import BaseView from './BaseView'
import React from 'react';
import WeatherTile from '../Tiles/Mobility/WeatherTile';
import WeatherTile from '../Tiles/Mobility/WeatherTile';
//import { useContext, createContext } from 'react'
import Columns from '../Layout/Columns';

export default function MobilityView() {

  return (

    <BaseView type="münster">
      <BikeInfrastructTile city="muenster"/>
      <Columns>
      <WeatherTile 
        city="muenster"
      ></WeatherTile>
      </Columns>
      
    </BaseView>

  )
}

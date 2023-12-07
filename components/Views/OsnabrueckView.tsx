//import Columns from '../Layout/Columns'
import Columns from '../Layout/Columns';
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import BaseView from './BaseView'
import React from 'react';
import WeatherTile from '../Tiles/Mobility/WeatherTile';
//import { useContext, createContext } from 'react'

export default function MobilityView() {

  return (

    <BaseView type="osnabrück">
      <BikeInfrastructTile city="osnabrueck"/>
      <Columns>
        <WeatherTile 
          city="osnabrueck"
        ></WeatherTile>
      </Columns>
    </BaseView>

  )
}

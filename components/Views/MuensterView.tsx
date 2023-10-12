//import Columns from '../Layout/Columns'
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import BaseView from './BaseView'
import React from 'react';
//import { useContext, createContext } from 'react'

export default function MobilityView() {

  return (

    <BaseView type="münster">
      <BikeInfrastructTile city="muenster"/>
    </BaseView>

  )
}
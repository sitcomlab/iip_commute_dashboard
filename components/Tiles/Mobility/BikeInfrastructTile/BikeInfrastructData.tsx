import L from 'leaflet';
//import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { FeatureGroup, GeoJSON, Pane } from 'react-leaflet';

//TODO: port all the dependencies

import MarkerClusterGroup from 'react-leaflet-markercluster';
import LayerControl, { GroupedLayer } from '../LayerControl/LayerControl';

import { updateParkingOverlay } from '../../../actions/globalsettings';

import {
    ChargingIcon,
    ShopIcon,
    ParkingIcon,
    RepairIcon,
    RentalIcon,
    TubeIcon,
    SignalIcon,
    WayfindingIcon,
    TrainstationIcon,
} from '../../Icons';

import BiMarkerIcon from './BiMarkerIcon';
import BiMarker from './BiMarker';
import { createClusterCustomIconBlue } from './ClusterMarkerIcons';
import { createClusterCustomIconGreen } from './ClusterMarkerIcons';
import { addInfo } from './PopupAddInfo';

import useBikeInfrastructData from '@/hooks/useBikeInfrastructure'

const BicycleInfrastructureData = () => {
    //regularly fetch bike infrastructure data
    var BicycleInfrastructureData = useBikeInfrastructData()

    if (BicycleInfrastructureData === undefined) {
        return (<></>)
    }

    //Do all the filtering and leaflet work
    // Filter and style mixed paths polygons
    const mixedPathPolygons = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'mixed_path' &&
            feature.geometry.type === 'Polygon'
    );
    let mixedPathPolygonsPathOptions = {
        color: '#b22f2f',
        weight: 1,
        dashArray: '10 10',
        opacity: 1,
    };

    // Filter and style cycling network
    const networkLines = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'cycling_network'
    );
    let networkPathOptions = {
        color: '#f6ef3c',
        weight: 10,
        opacity: 0.5,
    };

    // Filter and style traffic calming
    const trafficCalming = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'traffic_calming' &&
            feature.geometry.type !== 'Point'
    );
    let trafficCalmingPathOptions = {
        color: '#08A99C',
        weight: 2.5,
        opacity: 0.4,
    };

    // Filter and style oneway exceptions
    const oneWayExceptions = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'oneway_exception'
    );
    let oneWayExceptionsPathOptions = {
        color: '#8429b1',
        weight: 2,
        opacity: 0.5,
        dashArray: '6 8',
    };

    // Filter and style mixed paths lines
    const mixedPathLines = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'mixed_path' &&
            feature.geometry.type === 'LineString'
    );
    let mixedPathLinesPathOptions = {
        color: '#b22f2f',
        weight: 1.5,
        opacity: 0.5,
    };

    // Filter and style cycle lanes
    const cycleLanes = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'cycle_lane'
    );
    let cycleLanesPathOptions = {
        color: '#cc0000',
        weight: 2,
        opacity: 0.8,
        dashArray: '6 8',
    };

    // Filter and style separated cycle lanes
    const sepCycleLanes = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'separated_cycle_lane' &&
            feature.geometry.type === 'LineString'
    );
    let sepCycleLanesPathOptions = {
        color: '#f8b000',
        weight: 2,
        opacity: 1,
    };

    // Filter and style cycling streets
    const cyclingStreets = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'cycling_street'
    );
    let cyclingstreetPathOptions = {
        color: '#319621',
        weight: 3,
        opacity: 1,
    };

    // Filter and style charging stations
    const chargingStations = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'charging_station'
    );
    function pointCharging(geojsonPoint: any, latlng: any) {
        let chargingIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#203864"
                    icon={<ChargingIcon fill="#DEEBF7" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: chargingIcon });
    }

    // Filter and style bicycle shops
    const bicycleShops = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'bicycle_shop' &&
            feature.geometry.type === 'Point'
    );
    function pointShop(geojsonPoint: any, latlng: any) {
        let shopIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#385723"
                    icon={<ShopIcon fill="#E2F0D9" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: shopIcon });
    }

    // Filter and style parking
    const parking = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'parking' &&
            feature.geometry.type === 'Point'
    );
    function pointParking(geojsonPoint: any, latlng: any) {
        let parkingIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#203864"
                    icon={<ParkingIcon fill="#DEEBF7" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: parkingIcon });
    }

    // Filter and style repair stations
    const repairStations = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'bicycle_repair_station'
    );
    function pointRepair(geojsonPoint: any, latlng: any) {
        let repairIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#385723"
                    icon={<RepairIcon fill="#E2F0D9" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: repairIcon });
    }

    // Filter and style rentals
    const rentals = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'bicycle_rental'
    );
    function pointRental(geojsonPoint: any, latlng: any) {
        let rentalIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#385723"
                    icon={<RentalIcon fill="#E2F0D9" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: rentalIcon });
    }

    // Filter and style tube vending
    const tubeVendings = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'tube_vending_machine'
    );
    function pointTube(geojsonPoint: any, latlng: any) {
        let tubeIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#385723"
                    icon={<TubeIcon fill="#E2F0D9" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: tubeIcon });
    }

    // Filter and style traffic signals
    const trafficSignals = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'traffic_signal'
    );
    function pointSignal(geojsonPoint: any, latlng: any) {
        let signalIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarker icon={<SignalIcon stroke="#000000" />}></BiMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });
        return L.marker(latlng, { icon: signalIcon });
    }

    // Filter and style wayfinding signs
    const wayfindingSigns = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'wayfinding'
    );
    function pointWayfinding(geojsonPoint: any, latlng: any) {
        let wayfindingIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarker
                    icon={<WayfindingIcon stroke="#000000" fill="#ffc000" />}
                ></BiMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });
        return L.marker(latlng, { icon: wayfindingIcon });
    }

    // Filter and style train station
    const trainStations = BicycleInfrastructureData.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'train_station'
    );
    function pointTrain(geojsonPoint: any, latlng: any) {
        let trainIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarkerIcon
                    color="#FF0000"
                    icon={<TrainstationIcon fill="#FFF3F3" />}
                ></BiMarkerIcon>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: trainIcon });
    }

}
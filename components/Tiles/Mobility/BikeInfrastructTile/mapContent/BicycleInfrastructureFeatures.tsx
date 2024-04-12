import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FeatureGroup, GeoJSON, Pane } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

import BiMarker from './BiMarker';
import BiMarkerIcon from './BiMarkerIcon';
import { createClusterCustomIconBlue } from './ClusterMarkerIcons';
import { createClusterCustomIconGreen } from './ClusterMarkerIcons';
import { addInfo } from '../PopupInfos/PopupAddInfo';
import { GroupedLayer } from '../LayerControl/LayerControl';

import {SvgChargingIcon as ChargingIcon} from '@/components/Icons/ChargingIcon';
import {SvgShopIcon as ShopIcon} from '@/components/Icons/ShopIcon';
import {SvgParkingIcon as ParkingIcon} from '@/components/Icons/ParkingIcon';
import {SvgRepairIcon as RepairIcon} from '@/components/Icons/RepairIcon';
import {SvgRentalIcon as RentalIcon} from '@/components/Icons/RentalIcon';
import {SvgTubeIcon as TubeIcon} from '@/components/Icons/TubeIcon';
import {SvgSignalIcon as SignalIcon} from '@/components/Icons/SignalIcon';
import {SvgWayfindingIcon as WayfindingIcon} from '@/components/Icons/WayfindingIcon';

interface BIProps{
    contentGeometry: GeoJSON.FeatureCollection
}

function BicycleInfrastructureFeatures(props: BIProps) {

    if (props.contentGeometry === undefined || props.contentGeometry.features === undefined) {
        return (<></>)
    }

    // ## BICYCLE INFRASTRUCTURE
    // Filter and style mixed paths polygons
    const mixedPathPolygons = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'mixed_path' &&
        feature.geometry.type === 'Polygon'
    );
    const mixedPathPolygonsPathOptions = {
        color: '#b22f2f',
        weight: 1,
        dashArray: '10 10',
        opacity: 1,
    };
        
    // Filter and style cycling network
    const networkLines = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'cycling_network'
        );
    const networkPathOptions = {
        color: '#f6ef3c',
        weight: 10,
        opacity: 0.5,
    };
    
    // Filter and style traffic calming
    const trafficCalming = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'traffic_calming' &&
        feature.geometry.type !== 'Point'
        );
    const trafficCalmingPathOptions = {
        color: '#08A99C',
        weight: 2.5,
        opacity: 0.4,
    };
    
    // Filter and style oneway exceptions
    const oneWayExceptions = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'oneway_exception'
        );
    const oneWayExceptionsPathOptions = {
        color: '#8429b1',
        weight: 2,
        opacity: 0.5,
        dashArray: '6 8',
    };
    
    // Filter and style mixed paths lines
    const mixedPathLines = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'mixed_path' &&
        feature.geometry.type === 'LineString'
        );
    const mixedPathLinesPathOptions = {
        color: '#b22f2f',
        weight: 1.5,
        opacity: 0.5,
    };
    
    // Filter and style cycle lanes
    const cycleLanes = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'cycle_lane'
        );
    const cycleLanesPathOptions = {
        color: '#cc0000',
        weight: 2,
        opacity: 0.8,
        dashArray: '6 8',
    };
    
    // Filter and style separated cycle lanes
    const sepCycleLanes = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'separated_cycle_lane' &&
        feature.geometry.type === 'LineString'
        );
    const sepCycleLanesPathOptions = {
        color: '#f8b000',
        weight: 2,
        opacity: 1,
    };
    
    // Filter and style cycling streets
    const cyclingStreets = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'cycling_street'
        );
    const cyclingstreetPathOptions = {
        color: '#319621',
        weight: 3,
        opacity: 1,
    };

    // Filter and style charging stations
    const chargingStations = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'charging_station'
    );
    function pointCharging(geojsonPoint: any, latlng: any) {
        const chargingIcon = L.divIcon({
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
    const bicycleShops = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'bicycle_shop' &&
        feature.geometry.type === 'Point'
    );
    function pointShop(geojsonPoint: any, latlng: any) {
        const shopIcon = L.divIcon({
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
    const parking = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'parking' &&
        feature.geometry.type === 'Point'
    );
    function pointParking(geojsonPoint: any, latlng: any) {
        const parkingIcon = L.divIcon({
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
    const repairStations = props.contentGeometry.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'bicycle_repair_station'
    );
    function pointRepair(geojsonPoint: any, latlng: any) {  
        const repairIcon = L.divIcon({
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
    const rentals = props.contentGeometry.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'bicycle_rental'
    );
    function pointRental(geojsonPoint: any, latlng: any) {
        const rentalIcon = L.divIcon({
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

    // Filter and style traffic signals
    const trafficSignals = props.contentGeometry.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'traffic_signal'
    );
    function pointSignal(geojsonPoint: any, latlng: any) {
        const signalIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
            <BiMarker icon={<SignalIcon stroke="#000000" />}></BiMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });
        return L.marker(latlng, { icon: signalIcon });
    }

    // Filter and style tube vending
    const tubeVendings = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'tube_vending_machine'
    );
    function pointTube(geojsonPoint: any, latlng: any) {
        const tubeIcon = L.divIcon({
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

    // Filter and style wayfinding signs
    const wayfindingSigns = props.contentGeometry.features.filter(
        (feature: any) =>
            feature.properties.bike_infrastructure_type === 'wayfinding'
    );
    function pointWayfinding(geojsonPoint: any, latlng: any) {
        const wayfindingIcon = L.divIcon({
            className: '',
            html: renderToStaticMarkup(
                <BiMarker
                    icon={<WayfindingIcon fill="#ffc000" stroke="#000000" />}
                ></BiMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });
        return L.marker(latlng, { icon: wayfindingIcon });
    }

    return(
        <>
        {/* Radverkehrs-Maßnahmen  */}
        <GroupedLayer
        checked
        group="Radverkehrs-Maßnahmen"
        name="Fahrradstraße 2.0"
        >
        <Pane name="cyclingStreets" style={{ zIndex: 508 }}>
            <FeatureGroup>
                <GeoJSON
                    data={cyclingStreets}
                    key={'cyclingStreets'}
                    onEachFeature={addInfo}
                    style={cyclingstreetPathOptions}
                />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer checked group="Radverkehrs-Maßnahmen" name="Radweg">
        <Pane name="sepCycleLanes" style={{ zIndex: 506 }}>    
            <FeatureGroup>
                <GeoJSON
                    data={sepCycleLanes}
                    key={'sepCycleLanes'}
                    onEachFeature={addInfo}
                    style={sepCycleLanesPathOptions}
                />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>
        
        <GroupedLayer checked group="Radverkehrs-Maßnahmen" name="Radspur">
        <Pane name="cycleLanes" style={{ zIndex: 507 }}>
            <FeatureGroup>
                <GeoJSON
                    data={cycleLanes}
                    key={'cycleLanes'}
                    onEachFeature={addInfo}
                    style={cycleLanesPathOptions}
                />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer group="Radverkehrs-Maßnahmen" name="Fahrrad-Ampel">
        <Pane name="trafficSignals" style={{ zIndex: 510 }}>
            <FeatureGroup>
                <GeoJSON
                    data={trafficSignals}
                    key={'trafficSignals'}
                    pointToLayer={pointSignal}
                />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        {/* Radwege-Netz */}
        <GroupedLayer checked group="Radwege-Netz" name="Radwege-Netz">
        <Pane name="networkLines" style={{ zIndex: 504 }}>
            <FeatureGroup>
                <GeoJSON
                    data={networkLines}
                    key={'networkLines'}
                    style={networkPathOptions}
                />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer group="Radwege-Netz" name="Weg-Beschilderung">
        <Pane name="wayfindingSigns" style={{ zIndex: 509 }}>
            <FeatureGroup>
                <GeoJSON
                    data={wayfindingSigns}
                    key={'wayfindingSigns'}
                    pointToLayer={pointWayfinding}
                />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        {/* Parken und Laden */}
        <GroupedLayer
            group="Parken + Laden"
            icon={<ParkingIcon />}
            name="Parken"
        >
        <Pane name="parking" style={{ zIndex: 515 }}>
            {/*
            MarkerclusterGroup breaks leaflet. For an explanation see https://stackoverflow.com/questions/69371264/useleafletcontext-can-only-be-used-in-a-descendant-of-mapcontainer
            The fix is to use a previous version of react-leaflet or wait for a fix.

            If time, attempt some of the fixes proposed here: https://github.com/yuzhva/react-leaflet-markercluster/issues/187
            very technical though.

            it seems react-leaflet-markercluster is not really being actively developed

            This one is used as an alternative https://www.npmjs.com/package/@changey/react-leaflet-markercluster
            */}
            <MarkerClusterGroup
            clusterPane={'parking'}
            eventHandlers={{
                //TODO: look up how this works
                //TODO: what does this even do?
                //TODO: implement in a way that works
                add: (e: any) => {
                //dispatch(updateParkingOverlay(true));
                },
                remove: (e: any) => {
                //dispatch(updateParkingOverlay(false));
                },
            }}
            iconCreateFunction={createClusterCustomIconBlue}
            polygonOptions={{
                color: '#1c2b46',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.3,
            }}
            spiderfyDistanceMultiplier={3}
            >
            <GeoJSON
                data={parking}
                key={'parking'}
                onEachFeature={addInfo}
                pointToLayer={pointParking}
            ></GeoJSON>
            </MarkerClusterGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer
            group="Parken + Laden"
            icon={<ChargingIcon />}
            name="Lade-Station"
        >
        <Pane name="chargingStations" style={{ zIndex: 516 }}>
            <FeatureGroup>
            <GeoJSON
                data={chargingStations}
                key={'chargingStations'}
                onEachFeature={addInfo}
                pointToLayer={pointCharging}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        {/* Rad-Service */}
        <GroupedLayer
            group="Rad-Service"
            icon={<ShopIcon />}
            name="Fahrrad-Laden"
        >
        <Pane name="bicycleShops" style={{ zIndex: 514 }}>
            <MarkerClusterGroup
            clusterPane={'bicycleShops'}
            iconCreateFunction={createClusterCustomIconGreen}
            polygonOptions={{
                color: '#253a18',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.3,
            }}
            spiderfyDistanceMultiplier={3}
            >
            <GeoJSON
                data={bicycleShops}
                key={'bicycleShops'}
                onEachFeature={addInfo}
                pointToLayer={pointShop}
            ></GeoJSON>
            </MarkerClusterGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer
            group="Rad-Service"
            icon={<RepairIcon fill="#000000" />}
            name="DIY-Station"
        >
        <Pane name="repairStations" style={{ zIndex: 513 }}>
        <FeatureGroup>
            <GeoJSON
                data={repairStations}
                key={'repairStations'}
                onEachFeature={addInfo}
                pointToLayer={pointRepair}
            />
        </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer group="Rad-Service" name="Rad-Verleih">
        <Pane name="rentals" style={{ zIndex: 512 }}>
        <FeatureGroup>
            <GeoJSON
                data={rentals}
                key={'rentals'}
                onEachFeature={addInfo}
                pointToLayer={pointRental}
            />
        </FeatureGroup>
        </Pane>
        </GroupedLayer>
        
        <GroupedLayer group="Rad-Service" name="Schlauch-Automat">
        <Pane name="tubeVendings" style={{ zIndex: 511 }}>
            <FeatureGroup>
            <GeoJSON
                data={tubeVendings}
                key={'tubeVendings'}
                onEachFeature={addInfo}
                pointToLayer={pointTube}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        {/* Radverkehrs-Integration */}
        {/* <GroupedLayer group="Radverkehrs-Integration" name="Bahnhof">
        <Pane name="trainStations" style={{ zIndex: 517 }}>
            <FeatureGroup>
            <GeoJSON
                data={trainStations}
                key={'trainStations'}
                onEachFeature={addInfo}
                pointToLayer={pointTrain}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer group="Radverkehrs-Integration" name="Bushaltestelle">
        <Pane name="busStops" style={{ zIndex: 517 }}>
            <FeatureGroup>
            <GeoJSON
                data={busStops}
                key={'busStops'}
                onEachFeature={addInfo}
                pointToLayer={pointBusStop}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer> */}

        <GroupedLayer group="Radverkehrs-Integration" name="Verkehrsberuhigt">
        <Pane name="trafficCalming" style={{ zIndex: 502 }}>
            <FeatureGroup>
            <GeoJSON
                data={trafficCalming}
                key={'trafficCalming'}
                onEachFeature={addInfo}
                style={trafficCalmingPathOptions}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer
            group="Radverkehrs-Integration"
            name="Einbahnstraßen-Ausnahme"
        >
        <Pane name="onewayExceptions" style={{ zIndex: 503 }}>
            <FeatureGroup>
            <GeoJSON
                data={oneWayExceptions}
                key={'onewayExceptions'}
                style={oneWayExceptionsPathOptions}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer group="Radverkehrs-Integration" name="Mix-Weg">
        <Pane name="mixedPathLines" style={{ zIndex: 505 }}>
            <FeatureGroup>
            <GeoJSON
                data={mixedPathLines}
                key={'mixedPathLines'}
                onEachFeature={addInfo}
                style={mixedPathLinesPathOptions}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>

        <GroupedLayer group="Radverkehrs-Integration" name="Mix-Fläche">
        <Pane name="mixedPathPolygons" style={{ zIndex: 500 }}>
            <FeatureGroup>
            <GeoJSON
                data={mixedPathPolygons}
                key={'mixedPathPolygons'}
                onEachFeature={addInfo}
                style={mixedPathPolygonsPathOptions}
            />
            </FeatureGroup>
        </Pane>
        </GroupedLayer>
        </>
    )
}

export default BicycleInfrastructureFeatures
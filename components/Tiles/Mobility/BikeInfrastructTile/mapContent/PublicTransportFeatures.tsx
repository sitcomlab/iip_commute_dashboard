import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FeatureGroup, GeoJSON, Pane } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

import BiMarkerIcon from './BiMarkerIcon';
import { createClusterCustomIconBusStop } from './ClusterMarkerIcons';
import { addInfo } from '../PopupInfos/PopupAddInfo';
import { GroupedLayer } from '../LayerControl/LayerControl';

import {SvgTrainstationIcon as TrainstationIcon} from '@/components/Icons/TrainstationIcon';
import { SvgBusStopIcon as BusStopIcon } from '@/components/Icons/BusStopIcon';

interface BIProps{
    contentGeometry: GeoJSON.FeatureCollection
}

function PublicTransportFeatures(props: BIProps) {

    if (props.contentGeometry === undefined || props.contentGeometry.features === undefined) {
        return (<></>)
    }

    // Filter and style train station
    const trainStations = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'train_station'
    );
    function pointTrain(geojsonPoint: any, latlng: any) {
        const trainIcon = L.divIcon({
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

    // Filter and style bus stops
    //TODO: merge bus stops at the same street
    const busStops = props.contentGeometry.features.filter(
        (feature: any) => 
        feature.properties.bike_infrastructure_type === 'bus_stop'
    );
    function pointBusStop(geojsonPoint: any, latlng: any) {
        //TODO: add bus icon
        //TODO: implement popup for departures
        const trainIcon = L.divIcon({
        className: '',
        html: renderToStaticMarkup(
            <BusStopIcon
                height="70%"
                width="70%"
            />
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [-3, -11],
        });
        return L.marker(latlng, { icon: trainIcon });
    }

    return(
        <>
        {/* Haltestellen */}
        <GroupedLayer checked group="Haltestellen" name="Bahnhof">
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

        <GroupedLayer checked group="Haltestellen" name="Bushaltestelle">
        <Pane name="busStops" style={{ zIndex: 517 }}>
            <MarkerClusterGroup
                clusterPane="busStops"
                iconCreateFunction={createClusterCustomIconBusStop}
                polygonOptions={{
                    color: '#1c2b46',
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.3,
                }}
                spiderfyDistanceMultiplier={2}
            >
                <GeoJSON
                    data={busStops}
                    key={'busStops'}
                    onEachFeature={addInfo}
                    pointToLayer={pointBusStop}
                />
            </MarkerClusterGroup>
        </Pane>
        </GroupedLayer>
        </>
    )
}

export default PublicTransportFeatures
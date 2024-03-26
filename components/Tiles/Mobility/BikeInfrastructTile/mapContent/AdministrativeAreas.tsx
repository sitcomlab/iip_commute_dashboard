import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { FeatureGroup, GeoJSON, Pane, Popup, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { atom, useRecoilState} from 'recoil';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

import { GroupedLayer } from '../LayerControl/LayerControl';
import BiMarkerIcon from './BiMarkerIcon';
import { addInfo } from '../PopupInfos/PopupAddInfo';
import { createClusterCustomIconBlue } from './ClusterMarkerIcons';

import { SvgTrainstationIcon as TrainstationIcon } from '@/components/Icons/TrainstationIcon';
import { SvgBusStopIcon as BusStopIcon } from '@/components/Icons/BusStopIcon';
import { SvgParkingIcon as ParkingIcon } from '@/components/Icons/ParkingIcon';


interface AAProps{
    contentGeometry: GeoJSON.FeatureCollection|undefined,
    map: L.Map
}

enum PointDataType{
    none = 'keine',

    öffis = 'Öffis',

    fahrradLaden = 'Fahrrad-Laden',
    diyStation = 'DIY-Station',
    radVerleih = 'Rad-Verleih',
    schlauchAutomat = 'Schlauch-Automat',

    parken = 'Parken',
    ladeStation = 'Ladestation',

    fahrradAmpel = 'Fahrrad-Ampel'
}

//not the bristol stool scale
const selectedAAState = atom({
    key: 'selectedAA',
    default: ''
})
const selectedAAFeatureState = atom({
    key: 'selectedAAFeature',
    default: []
})
const displayedPointDataState = atom({
    key: 'displayedPointData',
    default: PointDataType.none
})

const StyledPopup = styled(Popup)`
  min-width: 400px;
  padding: 0rem;
  margin: 0rem;
  border: 0rem;
`;

function AdministrativeAreas(props: AAProps) {
    const [selectedAA, setSelectedAA] = useRecoilState(selectedAAState)
    const [selectedAAFeature, setSelectedAAFeature] = useRecoilState(selectedAAFeatureState)
    const [displayedPointData, setDisplayedPointData] = useRecoilState(displayedPointDataState)

    if (props.contentGeometry === undefined || props.contentGeometry.features === undefined) {
        return (<></>)
    }

    function isAdminAreaSelected(adminArea: String){
        if((selectedAAFeature === undefined || selectedAAFeature.properties === undefined)){
            return false
        }
        return(selectedAAFeature.properties.name == adminArea)
    }


    function arePointDataDisplayed(adminArea: String, typeDisplay: PointDataType){
        if((selectedAAFeature === undefined || selectedAAFeature.properties === undefined)){
            return false
        }
        return((selectedAAFeature.properties.name == adminArea && displayedPointData == typeDisplay))
    }

    // ## ADMINISTRATIVE AREAS
    //filter and style administrative areas
    const administrativeAreas = props.contentGeometry.features.filter(
        (feature: any) =>
        feature.properties.bike_infrastructure_type === 'admin_area'
    );
    const adminAreaOptions = {
        color: '#000000',
        weight: 2,
        opacity: 1,
        fillColor: '#4d514d',
        fillOpacity: 0.2,
    };
    const selectedAdminAreaOptions = {
        color: '#000000',
        weight: 2,
        opacity: 1,
        fillColor: '#4d514d',
        fillOpacity: 0,
    };
    //event functions for Adnimistrative areas
    function clickAdminArea(e: any, feature) {
        setSelectedAAFeature(feature);

        e.target.setStyle({
          color: '#000000',
          weight: 2,
          opacity: 1,
          fillColor: '#4d514d',
          fillOpacity: 0,
        });
        if (e.target.isTooltipOpen()) {
          e.target.closeTooltip();
        }
      }
      function popupCloseAdminArea(e: any) {
        e.target.setStyle({
          color: '#000000',
          weight: 2,
          opacity: 1,
          fillColor: '#4d514d',
          fillOpacity: 0.2,
        });
      }
      function mouseMoveAdminArea(e: any) {
        if (!e.target.isPopupOpen()) {
            e.target.openTooltip(e.latlng);
        }
      }
      function mouseOverAdminArea(e: any) {
        if (e.target.isPopupOpen()) {
          e.target.closeTooltip();
        }
      }

        //filter Bus and train stations of selected admin area
        const trainStations = props.contentGeometry.features.filter(
            (feature: any) =>
            feature.properties.bike_infrastructure_type === 'train_station' &&
            feature.properties.aa === selectedAA &&
            PointDataType.öffis === displayedPointData
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
            feature.properties.bike_infrastructure_type === 'bus_stop' &&
            feature.properties.aa === selectedAA &&
            displayedPointData == PointDataType.öffis
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

        const parking = props.contentGeometry.features.filter(
            (feature: any) =>
            feature.properties.bike_infrastructure_type === 'parking' &&
            feature.geometry.type === 'Point' &&
            feature.properties.aa === selectedAA &&
            displayedPointData == PointDataType.parken
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

      return(
        <>
        { displayedPointData == PointDataType.öffis &&
        <GroupedLayer
                checked
                group="Stadtteile"
                name="Öffentliche Verkehrsmittel"
            >
            <Pane name="busStops" style={{ zIndex: 600 }}>
                <>
                {/* naively display the bus stop GeoJSON, the filtering is done based on a state, which is set by the options */}
                <FeatureGroup>
                    <GeoJSON
                        data={busStops}
                        key={'busStops_'+selectedAA}
                        onEachFeature={addInfo}
                        pointToLayer={pointBusStop}
                    />
                    <GeoJSON
                        data={trainStations}
                        key={'trainStations_'+selectedAA}
                        onEachFeature={addInfo}
                        pointToLayer={pointTrain}
                    />
                </FeatureGroup>
                </>
            </Pane>
        </GroupedLayer>
        }
        { displayedPointData == PointDataType.parken &&
        <GroupedLayer
            checked
            group="Parken + Laden"
            icon={<ParkingIcon />}
            name="Parken"
        >
            <Pane name="parking" style={{ zIndex: 610 }}>
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
                        key={'parking_'+selectedAA}
                        onEachFeature={addInfo}
                        pointToLayer={pointParking}
                    />
                </MarkerClusterGroup>
            </Pane>
        </GroupedLayer>
        }

        <GroupedLayer 
                checked
                group="Stadtteile"
                name="Stadtteile"
            >
            <Pane name="administrativeAreas" style={{ zIndex: 500}}>
            <FeatureGroup>
            {administrativeAreas.map((feature: any, index: any) => {
                if(isAdminAreaSelected(feature.properties.name)){
                    return(
                        <GeoJSON
                            data={feature}
                            eventHandlers={{
                                click: (e) => {clickAdminArea(e, feature)},
                            }}
                            key={'aa'+index+Date.now()+'selected'}
                            pathOptions={selectedAdminAreaOptions}
                        >
                        </GeoJSON>
                    )    
                }
                
                return(
                    <GeoJSON
                        data={feature}
                        eventHandlers={{
                            click: (e) => {clickAdminArea(e, feature)},
                            mousemove: mouseMoveAdminArea,
                            mouseover: mouseOverAdminArea,
                        }}
                        key={'aa'+index+Date.now()}
                        pathOptions={adminAreaOptions}
                    >
                        <Tooltip pane="tooltip">{feature.properties.name}</Tooltip>
                    </GeoJSON>
                )
                
                })}

            </FeatureGroup>
            </Pane>
        </GroupedLayer>
        </>
      )

}

export { 
    selectedAAState,
    selectedAAFeatureState,
    displayedPointDataState,
    PointDataType
}
export default AdministrativeAreas
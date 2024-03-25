import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { FeatureGroup, GeoJSON, Pane, Popup, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { atom, useRecoilState} from 'recoil';

import { GroupedLayer } from '../LayerControl/LayerControl';
import BiMarkerIcon from './BiMarkerIcon';
import { addInfo } from '../PopupInfos/PopupAddInfo';
import { selectedAAFeatureState } from '../BikeInfrastructTileContent';

import { SvgTrainstationIcon as TrainstationIcon } from '@/components/Icons/TrainstationIcon';
import { SvgBusStopIcon as BusStopIcon } from '@/components/Icons/BusStopIcon';


interface AAProps{
    contentGeometry: GeoJSON.FeatureCollection|undefined,
    map: L.Map
}

//not the bristol stool scale
const selectedAAState = atom({
    key: 'selectedAA',
    default: ''
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

    if (props.contentGeometry === undefined || props.contentGeometry.features === undefined) {
        return (<></>)
    }

    function toggleDisplayStops(adminArea: String){
        //TODO: this works but doesn't cause a re-render
        if( selectedAA == adminArea ){
            setSelectedAA('')
        }else{
            setSelectedAA(adminArea)
        }
        return
    }

    function isAdminAreaSelected(adminArea: String){
        if((selectedAAFeature === undefined || selectedAAFeature.properties === undefined)){
            return false
        }
        return(selectedAAFeature.properties.name == adminArea)
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
            feature.properties.aa === selectedAA
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
            feature.properties.aa === selectedAA
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
        <GroupedLayer
                checked
                group="Stadtteile"
                name="Öffentliche Verkehrsmittel"
            >
            <Pane name="busStops" style={{ zIndex: 600 }}>
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
            </Pane>
        </GroupedLayer>
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

export { selectedAAState }
export default AdministrativeAreas
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { FeatureGroup, GeoJSON, Pane, Popup, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { Suspense } from 'react';
import { atom, useRecoilState} from 'recoil';

import PopupPages from '../PopupInfos/PopupPages';
import PopupData, {Size} from '../PopupInfos/PopupData';
import SliderCarousel from '../PopupInfos/SlideCarousel';
import { CapacityLegend, ChartHeadingWrapper, TilesWrapper } from '../styles';
import { CapacitySlider } from '../PopupInfos/CapacitySlider';
import DonutChart from '../PopupInfos/DonutChart';
import { GroupedLayer } from '../LayerControl/LayerControl';
import BiMarkerIcon from './BiMarkerIcon';
import { addInfo } from '../PopupInfos/PopupAddInfo';
import { selectedAAFeatureState } from '../BikeInfrastructTileContent';

import { SvgTrainstationIcon as TrainstationIcon } from '@/components/Icons/TrainstationIcon';
import { SvgBusStopIcon as BusStopIcon } from '@/components/Icons/BusStopIcon';

import { Button } from '@/components/Elements/Button';


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

    function focusFeature(feature: L.FeatureGroup){
        const map = props.map.map
        map.flyToBounds(feature.getBounds())
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
                return(

                <GeoJSON
                    data={feature}
                    eventHandlers={{
                        click: (e) => {clickAdminArea(e, feature)},
                        popupclose: popupCloseAdminArea,
                        mousemove: mouseMoveAdminArea,
                        mouseover: mouseOverAdminArea,
                    }}
                    key={'aa'+index}
                    pathOptions={adminAreaOptions}
                >
                    <Tooltip pane="tooltip">{feature.properties.name}</Tooltip>
                        <StyledPopup
                            autoClose={false}
                            closeOnClick={false}
                            pane="popup"
                        >
                        <PopupPages
                        contentCycling={
                            <>
                            <TilesWrapper>
                                <Suspense
                                fallback={<Skeleton height="100%" width="100%" />}
                                >
                                <PopupData 
                                    decimals={2}
                                    header='Gesamtlänge'
                                    size={Size.big}
                                    unit='Kilometer'
                                    value={
                                        feature.properties.cycling.cyclingstreets.lengthKM
                                    }
                                ></PopupData>
                                </Suspense>
                            </TilesWrapper>
                            </>
                        }
                        contentParking={
                            function(){
                            if(feature.properties.parking.freqObjects > 0){
                                return(<SliderCarousel
                                contentCapacity={
                                    <>
                                    <ChartHeadingWrapper>
                                    <span className="is-size-6">
                                      {'Stellplätze'}
                                    </span>
                                    </ChartHeadingWrapper>
                                    <CapacityLegend>
                                        <p className="green">
                                        Parkeinheiten mit bekannter <br /> Kapazität
                                        </p>
                                        <p className="blue">
                                        Bekannte Summe an
                                        <br /> Stellplätzen
                                        </p>
                                        <p className="red">
                                        Parkeinheiten <br /> mit unbekannter Kapazität
                                        </p>
                                    </CapacityLegend>
                                    <CapacitySlider
                                        freqKnown={
                                        feature.properties.parking.capacity.freqKnown
                                        }
                                        freqUnknown={
                                        feature.properties.parking.capacity
                                            .freqUnknown
                                        }
                                        max={
                                        feature.properties.parking.capacity
                                            .freqKnown +
                                        feature.properties.parking.capacity
                                            .freqUnknown
                                        }
                                        sumStands={
                                        feature.properties.parking.capacity.sumStands
                                        }
                                    ></CapacitySlider>
                                    </>
                                }
                                contentParkingunits={
                                    <PopupData 
                                        decimals={0}
                                        header='Summe Parkeinheiten'
                                        size={Size.big}
                                        value={
                                          feature.properties.parking.freqObjects
                                        }
                                    ></PopupData>
                                }
                                contentTypes={
                                    <span>
                                    <div style={{height: '240px', width: '400px'}}>
                                    <ChartHeadingWrapper>
                                        <span className="is-size-6">
                                        {'Parktypen'}
                                        </span>
                                    </ChartHeadingWrapper>
                                    <DonutChart 
                                        data={
                                            (() => {
                                            function colorPicker(type: string){
                                                switch (type) {
                                                    case 'Unbekannt':
                                                    return '#bcbcbc';
                                                    case 'Radstall':
                                                    return '#f8cc1b';
                                                    case 'Anlehnbügel':
                                                    return '#fa7a48';
                                                    case '(Boden)Anker':
                                                    return '#ab0a58';
                                                    case 'Radboxen':
                                                    return '#bed057';
                                                    case 'Reifenständer':
                                                    return '#84a2cd';
                                                    case 'Rad-Gebäude':
                                                    return '#442276';
                                                    case 'Lenkerhalter':
                                                    return '#ffa5c8';
                                                    case 'Doppeletage':
                                                    return '#4777cd';
                                                }
                                            }

                                            const dataArray = []
                                            for (const key of Object.keys(feature.properties.parking.type)){

                                                dataArray.push({
                                                    value: feature.properties.parking.type[key],
                                                    name: key,
                                                    color: colorPicker(key)
                                                })
                                            }
                                            return dataArray
                                            })()                                           
                                        }
                                        orientation='horizontal'
                                        style={{height: '300px'}}
                                    />
                                    </div>
                                    </span>
                                }
                                contentWeather={
                                    <>
                                    <span>
                                    <div style={{height: '240px', width: '350px'}}>
                                    <ChartHeadingWrapper>
                                        <span className="is-size-6">
                                        {'Wetterschutz'}
                                        </span>
                                    </ChartHeadingWrapper>
                                    <DonutChart 

                                        data={[
                                            {
                                                value: feature.properties.parking.weather.Ja,
                                                name: 'Ja',
                                                color: 'rgb(134, 188, 37)'
                                            },{
                                                value: feature.properties.parking.weather.Nein,
                                                name: 'Nein',
                                                color: 'rgb(234, 79, 61)'
                                            },{
                                                value: feature.properties.parking.weather.Unbekannt,
                                                name: 'Unbekannt',
                                                color: '#bcbcbc'
                                            }
                                        ]}
                                        orientation='vertical'
                                    />
                                    </div>
                                    </span>
                                    </>
                                }
                                ></SliderCarousel>)} 

                                //no need for pages when there are no parking units
                                return (
                                <>
                                <TilesWrapper>
                                    <Suspense
                                    fallback={<Skeleton height="100%" width="100%" />}
                                    >
                                    <PopupData 
                                        decimals={0}
                                        header='Summe Parkeinheiten'
                                        size={Size.big}
                                        value={
                                        feature.properties.parking.freqObjects
                                        }
                                    ></PopupData>
                                    </Suspense>
                                </TilesWrapper>
                                </>
                                )
                            }()
                        }

                        contentPublicTransport={
                            <TilesWrapper>
                            <Suspense
                                fallback={<Skeleton height="100%" width="100%" />}
                            >
                                <PopupData 
                                    decimals={0}
                                    header='Bus- haltestellen'
                                    size={Size.normal}
                                    unit=''
                                    value={
                                        feature.properties.service.busStopsWithin                                    }
                                ></PopupData>
                            </Suspense><br/>
                            <Suspense
                                fallback={<Skeleton height="100%" width="100%" />}
                            >
                                <PopupData 
                                    decimals={0}
                                    header='Bahnhöfe'
                                    size={Size.normal}
                                    unit=''
                                    value={
                                        feature.properties.service.trainStationsWithin
                                    }
                                ></PopupData>
                            </Suspense>
                            <Button hover='mobility' onClick={() => {
                                    toggleDisplayStops(feature.properties.name);
                                    if(selectedAA != feature.properties.name){
                                        focusFeature(L.geoJSON(feature))
                                    }
                                }}
                                size='md'
                            >{selectedAA != feature.properties.name ? 'zeigen' : 'verstecken'}</Button>
                            </TilesWrapper>
                        }

                        contentService={
                            <TilesWrapper>
                            <Suspense
                                fallback={<Skeleton height="100%" width="100%" />}
                            >
                                <PopupData 
                                    decimals={0}
                                    header='Läden innerhalb'
                                    size={Size.normal}
                                    unit=''
                                    value={
                                        feature.properties.service.shopsWithin
                                    }
                                ></PopupData>
                            </Suspense>
                            <Suspense
                                fallback={<Skeleton height="100%" width="100%" />}
                            >
                                <PopupData 
                                    decimals={0}
                                    header='Läden in der Nähe'
                                    size={Size.normal}
                                    unit=''
                                    value={
                                        feature.properties.service.shopsNearby
                                    }
                                ></PopupData>
                            </Suspense>
                            <Suspense
                                fallback={<Skeleton height="100%" width="100%" />}
                            >
                                <PopupData 
                                    decimals={2}
                                    header='Abdeckung'
                                    size={Size.normal}
                                    unit='%'
                                    value={
                                        feature.properties.service.coverage
                                    }
                                ></PopupData>                                    
                                {/*TODO: don't forget the hover-description*/}
                            </Suspense>
                            </TilesWrapper>
                        }

                        name={feature.properties.name}
                        ></PopupPages>
                        </StyledPopup>

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
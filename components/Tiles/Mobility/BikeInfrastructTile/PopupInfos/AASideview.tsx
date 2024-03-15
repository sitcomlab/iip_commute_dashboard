import Skeleton from 'react-loading-skeleton';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';

import { Button } from '@/components/Elements/Button';
import PopupPages from '../PopupInfos/PopupPages';
import PopupData, {Size} from '../PopupInfos/PopupData';
import SliderCarousel from '../PopupInfos/SlideCarousel';
import { CapacityLegend, ChartHeadingWrapper, TilesWrapper } from '../styles';
import { CapacitySlider } from '../PopupInfos/CapacitySlider';
import DonutChart from '../PopupInfos/DonutChart';

import { selectedAAState } from '../mapContent/AdministrativeAreas';
import { selectedAAFeatureState } from '../BikeInfrastructTileContent';

function AASideView(){
    const [selectedAA, setSelectedAA] = useRecoilState(selectedAAState)
    const [selectedAAFeature, setSelectedAAFeature] = useRecoilState(selectedAAFeatureState)
    console.log(selectedAAFeature)

    function toggleDisplayStops(adminArea: String){
        //TODO: this works but doesn't cause a re-render
        if( selectedAA == adminArea ){
            setSelectedAA('')
        }else{
            setSelectedAA(adminArea)
        }
        return
    }

    const feature = selectedAAFeature

    if(feature === undefined || feature.properties === undefined){
        return <>selected: none</>
    }

    return(
        <>
        {/* <h1>selected: {(selectedAAFeature.properties === undefined)? 'none' : selectedAAFeature.properties.name}</h1> */}




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











        </>
    )
}

export default AASideView
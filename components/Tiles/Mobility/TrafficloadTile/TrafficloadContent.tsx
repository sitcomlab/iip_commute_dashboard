//@ts-nocheck
'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Carousel from '@/components/Elements/Carousel'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { useState } from 'react'
import { useWindowSize } from 'react-use'
import monatsmittelwerte from '@/assets/data/monatsmittelwerte.json'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Pendlerkarte } from '@/components/Icons'

function Toggle({ onChange }: { onChange: (_val: string) => void }) {
  return (
    <ToggleGroup
      items={[
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2010
            </Title>
          ),
          value: '2010',
        },
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2015
            </Title>
          ),
          value: '2015',
        },
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              Aktuelles Jahr
            </Title>
          ),
          value: 'current',
        },
      ]}
      onChange={onChange}
      variant={'mobility'}
    />
  )
}

const kfzIcon = require('@/assets/icons/Trafficload/TrafficloadCar.svg').default
  .src

const getIcon = (width: number) => {
  return {
    value: 0,
    label: {
      show: true,
      position: 'center',
      formatter: '{Icon|}',
      rich: {
        Icon: {
          height: width <= 1600 ? 30 : 40,
          width: width <= 1600 ? 25 : 50,
          align: 'left',
          backgroundColor: {
            image: `${kfzIcon}`,
          },
        },
      },
    },
  }
}

const getLabel = (value: number, name: string, width: number) => {
  return {
    value: value,
    name: name,
    label: {
      show: width > 1024,
      textStyle: {
        opacity: 1,
      },
      emphasis: {
        opacity: 1,
      },
      formatter: () => {
        const monatsmittelValue = value !== 0 ? value : 'Keine Daten'
        return `{street|${name}}\n{monatsmittel|${monatsmittelValue}}`
      },
      rich: {
        street: {
          color: '#005b79',
          fontWeight: 'bold',
          align: 'left',
          fontSize: width <= 1600 ? 12 : 14,
          // fontWeight: 500,
          padding: width <= 1600 ? [6, 0, 6, 0] : [18, 0, 6, 0],
        },
        monatsmittel: {
          color: '#34c17b',
          align: 'left',
          fontSize: width <= 1600 ? 32 : 40,
          fontWeight: 'bold',
          // fontWeight: 500,
        },
      },
    },
  }
}

export default function TrafficloadContent() {
  const [monthIndex, setMonthIndex] = useState(1)
  const [mode, setMode] = useState<'2010' | '2015' | 'current'>('current')
  const { width } = useWindowSize()

  let year
  if (mode === 'current') {
    year = new Date().getFullYear().toString()
  } else {
    year = mode
  }

  const data = monatsmittelwerte.features.filter(f => {
    return (
      f.properties.year.toString() === year &&
      f.properties.month === monthIndex + 1
    )
  })

  const albersloher = data.find(d => d.properties.amknotennr === 10010750)
  const warendorfer = data.find(d => d.properties.amknotennr === 10011170)
  const weseler = data.find(d => d.properties.amknotennr === 10022200)
  const rishon = data.find(d => d.properties.amknotennr === 10024088)
  const steinfurter = data.find(d => d.properties.amknotennr === 20000723)

  const streetData = {
    'Albersloher Weg / Heumannsweg':
      albersloher?.properties.mittelwert.toFixed(0) ?? 0,
    'Warendorfer Str. / Schifffahrter Damm':
      warendorfer?.properties.mittelwert.toFixed(0) ?? 0,
    'Weseler Str. / Inselbogen': weseler?.properties.mittelwert.toFixed(0) ?? 0,
    'Rishon-le-Zion-Ring / Einsteinstr.':
      rishon?.properties.mittelwert.toFixed(0) ?? 0,
    'Steinfurter Str. / Austermannstr.':
      steinfurter?.properties.mittelwert.toFixed(0) ?? 0,
  }

  return (
    <>
      <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute -top-4 left-0 w-full md:-top-6 md:w-auto">
          <Toggle onChange={val => setMode(val as typeof mode)} />
        </div>
        <div className="absolute bottom-5 left-0 flex h-[80%] w-full">
          <Pendlerkarte className="h-full w-full flex-1" />
          <div className="sm:w-14"></div>
          {/* <SvgCarIcon className="[-translate-x-1/2] [-translate-y-1/2] absolute left-[50%] top-[50%] h-6 w-6 transform" />
          <SvgCarIcon className="[-translate-x-1/2] [-translate-y-1/2] absolute left-[60%] top-[30%] transform" />
          <SvgCarIcon className="[-translate-x-1/2] [-translate-y-1/2] absolute left-[25%] top-[30%] transform" />
          <SvgCarIcon className="[-translate-x-1/2] [-translate-y-1/2] absolute left-[30%] top-[40%] transform" />
          <SvgCarIcon className="[-translate-x-1/2] [-translate-y-1/2] absolute left-[50%] top-[50%] transform" /> */}
        </div>
        <div className="w-full flex-1 pb-12">
          <div className=" h-full w-full">
            <ReactECharts
              option={{
                series: [
                  {
                    name: '1',
                    type: 'pie',
                    center: ['35%', '45%'],
                    itemStyle: {
                      color: 'transparent',
                      // opacity: 0.2,
                    },
                    radius: ['20%'],
                    label: {
                      show: true,
                      position: 'center',
                      textStyle: {
                        opacity: 1,
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [getIcon(width)],
                  },
                  {
                    name: 'Steinfurter Str. / Austermannstr.',
                    type: 'pie',
                    center: ['35%', '45%'],
                    startAngle: 0,
                    selectedMode: width < 1024 ? 'single' : false,
                    itemStyle: {
                      color: '#34c17b',
                      opacity: 0.2,
                    },
                    select: {
                      itemStyle: {
                        color: '#005b79',
                      },
                    },
                    radius: ['', '20%'],
                    labelLine: {
                      show: true,
                      lineStyle: {
                        color: '#005b79',
                        opacity: 1,
                        cap: 'round',
                      },
                    },
                    labelLayout: {
                      x: '25%',
                      y: '30%',
                    },
                    data: [
                      getLabel(
                        streetData['Steinfurter Str. / Austermannstr.'],
                        'Steinfurter Straße / Austermannstraße',
                        width,
                      ),
                    ],
                  },
                  {
                    name: '2',
                    type: 'pie',
                    center: ['40%', '60%'],
                    itemStyle: {
                      color: 'transparent',
                      // opacity: 0.2,
                    },
                    radius: ['15%'],
                    label: {
                      show: true,
                      position: 'center',
                      textStyle: {
                        opacity: 1,
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [getIcon(width)],
                  },
                  {
                    name: '33',
                    type: 'pie',
                    startAngle: 0,
                    selectedMode: width < 1024 ? 'single' : false,
                    select: {
                      itemStyle: {
                        color: '#005b79',
                      },
                    },
                    center: ['40%', '60%'],
                    itemStyle: {
                      color: '#34c17b',
                      opacity: 0.2,
                    },
                    radius: ['', '15%'],
                    label: {
                      show: true,
                    },
                    labelLine: {
                      show: true,
                      lineStyle: {
                        color: '#005b79',
                      },
                    },
                    labelLayout: {
                      x: '30%',
                      y: '65%',
                    },
                    data: [
                      getLabel(
                        streetData['Rishon-le-Zion-Ring / Einsteinstr.'],
                        'Rishon-le-Zion-Ring / Einsteinstr.',
                        width,
                      ),
                    ],
                  },

                  {
                    name: '3',
                    type: 'pie',
                    center: ['55%', '75%'],
                    itemStyle: {
                      color: 'transparent',
                      // opacity: 0.2,
                    },
                    radius: ['20%'],
                    label: {
                      show: true,
                      position: 'center',
                      textStyle: {
                        opacity: 1,
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [getIcon(width)],
                  },
                  {
                    name: '33',
                    type: 'pie',
                    selectedMode: width < 1024 ? 'single' : false,
                    select: {
                      itemStyle: {
                        color: '#005b79',
                      },
                    },
                    center: ['55%', '75%'],
                    itemStyle: {
                      color: '#34c17b',
                      opacity: 0.2,
                    },
                    radius: ['', '20%'],
                    label: {
                      show: true,
                    },
                    labelLine: {
                      show: true,
                      lineStyle: {
                        color: '#005b79',
                      },
                    },
                    data: [
                      getLabel(
                        streetData['Albersloher Weg / Heumannsweg'],
                        'Albersloher Weg / Heumannsweg',
                        width,
                      ),
                    ],
                  },
                  {
                    name: '4',
                    type: 'pie',
                    center: ['60%', '55%'],
                    itemStyle: {
                      color: 'transparent',
                      // opacity: 0.2,
                    },
                    radius: ['15%'],
                    label: {
                      show: true,
                      position: 'center',
                      textStyle: {
                        opacity: 1,
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [getIcon(width)],
                  },
                  {
                    name: '33',
                    type: 'pie',
                    center: ['60%', '55%'],
                    selectedMode: width < 1024 ? 'single' : false,
                    select: {
                      itemStyle: {
                        color: '#005b79',
                      },
                    },
                    itemStyle: {
                      color: '#34c17b',
                      opacity: 0.2,
                    },
                    radius: ['', '15%'],
                    label: {
                      show: true,
                    },
                    labelLine: {
                      show: true,
                      lineStyle: {
                        color: '#005b79',
                      },
                    },
                    data: [
                      getLabel(
                        streetData['Warendorfer Str. / Schifffahrter Damm'],
                        ' Warendorfer Str. / Schifffahrter Damm',
                        width,
                      ),
                    ],
                  },
                  {
                    name: '5',
                    type: 'pie',
                    center: ['35%', '75%'],
                    itemStyle: {
                      color: 'transparent',
                      // opacity: 0.2,
                    },
                    radius: ['15%'],
                    label: {
                      show: true,
                      position: 'center',
                      textStyle: {
                        opacity: 1,
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [getIcon(width)],
                  },
                  {
                    name: '33',
                    type: 'pie',
                    center: ['35%', '75%'],
                    startAngle: 0,
                    selectedMode: width < 1024 ? 'single' : false,
                    select: {
                      itemStyle: {
                        color: '#005b79',
                      },
                    },
                    itemStyle: {
                      color: '#34c17b',
                      opacity: 0.2,
                    },
                    radius: ['', '15%'],
                    label: {
                      show: true,
                    },
                    labelLine: {
                      show: true,
                      lineStyle: {
                        color: '#005b79',
                      },
                    },
                    labelLayout: {
                      x: '25%',
                      y: '90%',
                    },
                    data: [
                      getLabel(
                        streetData['Weseler Str. / Inselbogen'],
                        'Weseler Str. / Inselbogen',
                        width,
                      ),
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-white px-4 pb-4 lg:hidden">
        <Carousel arrows variant={'mobility'}>
          {Object.keys(streetData).map((key, index) => {
            const val = parseInt(streetData[key as keyof typeof streetData])
            return (
              <div
                className="flex items-center justify-center gap-3"
                key={index}
              >
                <div>
                  <Title as="h5" variant={'primary'}>
                    {key}
                  </Title>
                  <Title
                    as="h3"
                    style={{
                      color: '#34c17b',
                    }}
                  >
                    <AnimatedNumber>{val}</AnimatedNumber>
                  </Title>
                </div>
              </div>
            )
          })}
        </Carousel>
      </div>
      <Slider
        defaultValue={[monthIndex]}
        labels={[
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAI',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OKT',
          'NOV',
          'DEZ',
        ]}
        max={11}
        min={0}
        onValueChange={([e]) => {
          setMonthIndex(e)
        }}
        variant={'mobility'}
      />
    </>
  )
}

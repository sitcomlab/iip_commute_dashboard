//@ts-nocheck
'use client'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
// @ts-ignore
// import ModalSplitData from '@/assets/data/verkehrsmittelwahl-zeitreihe.csv'
import ModalSplitData from '@/assets/data/modal-split.csv'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import Slider from '@/components/Inputs/Slider'
import { MuensterBackground } from '@/components/Icons/'
import { useState } from 'react'
import { useWindowSize } from 'react-use'
import Carousel from '@/components/Elements/Carousel'
import Title from '@/components/Elements/Title'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import ToggleGroup from '@/components/Inputs/ToggleGroup'

const { theme } = resolveConfig(tailwindConfig)

interface IModalSplitData {
  ZEIT: number
  Absolut: number
  'Modal Split V.leistung - Fahrrad': number
  'Modal Split V.leistung - Fuß': number
  'Modal Split V.leistung - Kfz': number
  'Modal Split V.leistung - sonstige': number
  'Modal Split V.leistung - ÖV': number
  'Verkehrsmittelwahl Fahrrad': number
  'Verkehrsmittelwahl Fuß': number
  'Verkehrsmittelwahl Kfz': number
  'Verkehrsmittelwahl sonstige': number
  'Verkehrsmittelwahl ÖV': number
  'Wege/Tag': number
}

function Toggle({ onChange }: { onChange: (_val: string) => void }) {
  return (
    <ToggleGroup
      items={[
        {
          element: (
            <Title as="h5" className="2xl:w-max">
              Verkehrsleistung in km
            </Title>
          ),
          value: 'verkehrsleistung',
        },
        {
          element: (
            <Title as="h5" className="2xl:w-max">
              Anzahl Wege
            </Title>
          ),
          value: 'wege',
        },
      ]}
      onChange={onChange}
      variant={'mobility'}
    />
  )
}

const icons = {
  KFZ: require('@/assets/icons/ModalSplit/ModalsplitCar.svg').default.src,
  ÖPNV: require('@/assets/icons/ModalSplit/ModalsplitBus.svg').default.src,
  Fahrrad: require('@/assets/icons/ModalSplit/ModalsplitBicycle.svg').default
    .src,
  Fuß: require('@/assets/icons/ModalSplit/ModalsplitShoe.svg').default.src,
}

const colors = {
  //@ts-ignore
  KFZ: theme?.colors?.energy.DEFAULT || '#f28443',
  //@ts-ignore
  ÖPNV: theme?.colors?.climate.DEFAULT || '#14b3d9',
  //@ts-ignore
  Fahrrad: theme?.colors?.mobility.DEFAULT || '#34c17b',
  //@ts-ignore
  Fuß: theme?.colors?.buildings.DEFAULT || '#6060d6',
}

const nameColumnMapping = {
  KFZ: {
    verkehrsleistung: 'Modal Split V.leistung - Kfz',
    wege: 'Verkehrsmittelwahl Kfz',
  },
  ÖPNV: {
    verkehrsleistung: 'Modal Split V.leistung - ÖV',
    wege: 'Verkehrsmittelwahl ÖV',
  },
  Fahrrad: {
    verkehrsleistung: 'Modal Split V.leistung - Fahrrad',
    wege: 'Verkehrsmittelwahl Fahrrad',
  },
  Fuß: {
    verkehrsleistung: 'Modal Split V.leistung - Fuß',
    wege: 'Verkehrsmittelwahl Fuß',
  },
}

const data: IModalSplitData[] = ModalSplitData

export default function ModalSplitChart() {
  const [yearIndex, setYearIndex] = useState<number>(1)
  const [mode, setMode] = useState<'verkehrsmittelwahl' | 'verkehrsleistung'>(
    'verkehrsleistung',
  )

  const { width } = useWindowSize()

  const yearData = data.find(d => d.ZEIT === data.map(d => d.ZEIT)[yearIndex])

  const getSeries = (value: number, name: keyof typeof icons) => {
    return {
      value: value,
      name: name,
      label: {
        show: width > 1024,
        alignTo: 'labelLine',
        formatter: ['{Icon|}', '{name|{b}} ', '{percent|{c}%}'].join('\n'),
        rich: {
          Icon: {
            height: 35,
            width: width <= 1600 ? 35 : 50,
            align: 'left',
            backgroundColor: {
              image: `${icons[name]}`,
            },
          },
          name: {
            //@ts-ignore
            color: theme?.colors?.primary.DEFAULT || '#005b79',
            fontWeight: 'bold',
            align: 'left',
            fontSize: width <= 1600 ? 18 : 20,
            fontWeight: 500,
            padding: width <= 1600 ? [6, 0, 6, 0] : [18, 0, 6, 0],
          },
          percent: {
            color: colors[name],
            align: 'left',
            fontSize: width <= 1600 ? 32 : 40,
            fontWeight: 500,
          },
        },
      },
    }
  }

  if (!yearData) {
    return <></>
  }

  return (
    <>
      <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute -top-4 left-0 z-10 w-full md:-top-6 md:w-auto">
          <Toggle onChange={val => setMode(val as typeof mode)} />
        </div>
        <div className="absolute left-[40%] top-[50%] z-10 text-lg font-bold text-[#005b79] ">
          <div className="flex">
            <AnimatedNumber>
              {mode === 'verkehrsleistung'
                ? yearData.Absolut
                : yearData['Wege/Tag']}
            </AnimatedNumber>
            <p className="ml-1">
              {' '}
              {mode === 'verkehrsleistung' ? 'km' : 'Wege'}
            </p>
          </div>
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full">
          <MuensterBackground className="h-full w-full flex-1" />
          <div className="sm:w-14"></div>
        </div>
        <div className="w-full flex-1 pb-12">
          <div className=" h-full w-full">
            <ReactECharts
              option={{
                series: [
                  {
                    type: 'pie',
                    top: '10%',
                    radius:
                      width > 1024 && width < 1260
                        ? ['50%', '45%']
                        : ['75%', '68%'],
                    labelLine: {
                      length: width <= 1400 ? 50 : 150,
                      lineStyle: {
                        color: 'black',
                      },
                    },
                    data: [
                      getSeries(
                        mode === 'verkehrsleistung'
                          ? yearData['Modal Split V.leistung - Fuß']
                          : yearData['Verkehrsmittelwahl Fuß'],
                        'Fuß',
                      ),
                      getSeries(
                        mode === 'verkehrsleistung'
                          ? yearData['Modal Split V.leistung - Kfz']
                          : yearData['Verkehrsmittelwahl Kfz'],
                        'KFZ',
                      ),
                      getSeries(
                        mode === 'verkehrsleistung'
                          ? yearData['Modal Split V.leistung - ÖV']
                          : yearData['Verkehrsmittelwahl ÖV'],
                        'ÖPNV',
                      ),
                      getSeries(
                        mode === 'verkehrsleistung'
                          ? yearData['Modal Split V.leistung - Fahrrad']
                          : yearData['Verkehrsmittelwahl Fahrrad'],
                        'Fahrrad',
                      ),
                    ],
                    color: [
                      //@ts-ignore
                      theme?.colors?.buildings.DEFAULT || '#6060d6',
                      //@ts-ignore
                      theme?.colors?.energy.DEFAULT || '#f28443',
                      //@ts-ignore
                      theme?.colors?.climate.DEFAULT || '#14b3d9',
                      //@ts-ignore
                      theme?.colors?.mobility.DEFAULT || '#34c17b',
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
          {Object.keys(icons).map((key, index) => {
            return (
              <div
                className="flex items-center justify-center gap-3"
                key={index}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${key} Icon`}
                  className="h-full w-auto"
                  src={icons[key]}
                />
                <div>
                  <Title as="h5" variant={'primary'}>
                    {key}
                  </Title>
                  <Title
                    as="h3"
                    style={{
                      color: colors[key],
                    }}
                  >
                    <AnimatedNumber decimals={1}>
                      {yearData[nameColumnMapping[key][mode]]}
                    </AnimatedNumber>
                    %
                  </Title>
                </div>
              </div>
            )
          })}
        </Carousel>
      </div>
      <Slider
        defaultValue={[data.length - 1]}
        firstValueMobile={data.length - 1}
        labels={data.map(d => d.ZEIT)}
        max={data.length - 1}
        min={0}
        onValueChange={([e]) => {
          setYearIndex(e)
        }}
        variant={'mobility'}
      />
    </>
  )
}

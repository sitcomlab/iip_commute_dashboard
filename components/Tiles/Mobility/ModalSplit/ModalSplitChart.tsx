//@ts-nocheck
'use client'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
// @ts-ignore
import ModalSplitData from '@/assets/data/verkehrsmittelwahl-zeitreihe.csv'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import Slider from '@/components/Inputs/Slider'
import { MuensterBackground } from '@/components/Icons/'
import { useState } from 'react'
import { useWindowSize } from 'react-use'
import Carousel from '@/components/Elements/Carousel'
import Title from '@/components/Elements/Title'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

const { theme } = resolveConfig(tailwindConfig)

interface IModalSplitData {
  ZEIT: number
  'Verkehrsmittelwahl Fahrrad in %': number
  'Verkehrsmittelwahl Fuß in %': number
  'Verkehrsmittelwahl Kfz in %': number
  'Verkehrsmittelwahl sonstige in %': number
  'Verkehrsmittelwahl ÖV in %': number
  'Wege/Tag': number
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
  KFZ: 'Verkehrsmittelwahl Kfz in %',
  ÖPNV: 'Verkehrsmittelwahl ÖV in %',
  Fahrrad: 'Verkehrsmittelwahl Fahrrad in %',
  Fuß: 'Verkehrsmittelwahl Fuß in %',
}

const data: IModalSplitData[] = ModalSplitData

export default function ModalSplitChart() {
  const [yearIndex, setYearIndex] = useState<number>(0)

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
            height: 50,
            width: width <= 1600 ? 50 : 80,
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
                      getSeries(yearData['Verkehrsmittelwahl Kfz in %'], 'KFZ'),
                      getSeries(yearData['Verkehrsmittelwahl ÖV in %'], 'ÖPNV'),
                      getSeries(
                        yearData['Verkehrsmittelwahl Fahrrad in %'],
                        'Fahrrad',
                      ),
                      getSeries(yearData['Verkehrsmittelwahl Fuß in %'], 'Fuß'),
                    ],
                    color: [
                      //@ts-ignore
                      theme?.colors?.energy.DEFAULT || '#f28443',
                      //@ts-ignore
                      theme?.colors?.climate.DEFAULT || '#14b3d9',
                      //@ts-ignore
                      theme?.colors?.mobility.DEFAULT || '#34c17b',
                      //@ts-ignore
                      theme?.colors?.buildings.DEFAULT || '#6060d6',
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
                      {yearData[nameColumnMapping[key]]}
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
        defaultValue={[0]}
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

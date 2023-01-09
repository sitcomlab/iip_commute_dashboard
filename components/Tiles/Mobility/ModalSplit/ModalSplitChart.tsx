import { ReactECharts } from '@/components/Charts/ReactECharts'
import useModalSplitData from '@/hooks/useModalSplitData'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
// import {
//   ModalsplitAuto,
//   ModalsplitBus,
//   ModalsplitFahrrad,
//   ModalsplitHintergrundgrafik,
//   ModalsplitSchuh,
// } from '@/components/Icons/'
const { theme } = resolveConfig(tailwindConfig)

export default function KmChart() {
  const colors = [
    //@ts-ignore
    theme?.colors?.energy.DEFAULT || '#f28443',
    //@ts-ignore
    theme?.colors?.climate.DEFAULT || '#14b3d9',
    //@ts-ignore
    theme?.colors?.mobility.DEFAULT || '#34c17b',
    //@ts-ignore
    theme?.colors?.buildings.DEFAULT || '#6060d6',
  ]
  const data = useModalSplitData()

  const totalFuß: number = data
    .map(d => d.Fuß)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const totalKFZ: number = data
    .map(d => d.MIV)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const totalRad: number = data
    .map(d => d.Rad)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const totalÖPNV: number = data
    .map(d => d.ÖPNV)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const total: number = totalÖPNV + totalFuß + totalKFZ + totalRad

  const KfzData: number = parseInt(((totalKFZ / total) * 100).toFixed(0))
  const RadData: number = parseInt(((totalRad / total) * 100).toFixed(0))
  const ÖPNVData: number = parseInt(((totalÖPNV / total) * 100).toFixed(0))
  const FußData: number = parseInt(((totalFuß / total) * 100).toFixed(0))

  return (
    <ReactECharts
      option={{
        title: {
          text: total.toLocaleString('de-DE') + ' km',
          left: 'center',
          top: 'center',
          padding: 4,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        },
        // backgroundColor: {
        //   imageHeight: 375,
        //   imageWidth: 720,
        //   image: `${
        //     require('@/assets/icons/ModalSplit/ModalsplitHintergrundgrafik.svg')
        //       .default.src
        //   }`,
        // },
        series: [
          {
            type: 'pie',
            radius: ['75%', '68%'],
            labelLine: {
              length: 200,
              lineStyle: {
                color: 'black',
              },
            },
            data: [
              {
                value: KfzData,
                name: 'KFZ',
                label: {
                  alignTo: 'labelLine',
                  formatter: [
                    '  {Auto|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Auto: {
                      height: 50,
                      width: 50,
                      // align: 'left',
                      backgroundColor: {
                        image: `${
                          require('@/assets/icons/ModalSplit/ModalsplitAuto.svg')
                            .default.src
                        }`,
                      },
                    },
                    percent: {
                      // @ts-ignore
                      color: theme?.colors?.energy.DEFAULT || '#f28443',
                      align: 'center',
                      padding: [10, 0, 0, 5],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      //@ts-ignore
                      color: theme?.colors?.primary.DEFAULT || '#005b79',
                      // align: 'center',
                      padding: [5, 0, 0, 10],
                    },
                  },
                },
              },
              {
                value: ÖPNVData,
                name: 'ÖPNV',
                label: {
                  formatter: [
                    '  {Bus|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Bus: {
                      height: 50,
                      width: 50,
                      align: 'left',
                      backgroundColor: {
                        image: `${
                          require('@/assets/icons/ModalSplit/ModalsplitBus.svg')
                            .default.src
                        }`,
                      },
                    },
                    percent: {
                      //@ts-ignore
                      color: theme?.colors?.climate.DEFAULT || '#14b3d9',

                      align: 'center',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      //@ts-ignore
                      color: theme?.colors?.primary.DEFAULT || '#005b79',
                      align: 'left',
                      padding: [0, 0, 0, 5],
                    },
                  },
                },
              },
              {
                value: RadData,
                name: 'Fahrrad',
                label: {
                  formatter: [
                    '  {Rad|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Rad: {
                      height: 50,
                      width: 50,
                      align: 'left',
                      backgroundColor: {
                        image: `${
                          require('@/assets/icons/ModalSplit/ModalsplitFahrrad.svg')
                            .default.src
                        }`,
                      },
                    },
                    percent: {
                      // @ts-ignore
                      color: theme?.colors?.mobility.DEFAULT || '#34c17b',
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      //@ts-ignore
                      color: theme?.colors?.primary.DEFAULT || '#005b79',
                      padding: [0, 0, 0, 10],
                    },
                  },
                },
              },
              {
                value: FußData,
                name: 'Fußgänger:innen',
                label: {
                  alignTo: 'labelLine',
                  formatter: [
                    '  {Schuh|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Schuh: {
                      height: 50,
                      width: 50,
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      backgroundColor: {
                        image: `${
                          require('@/assets/icons/ModalSplit/ModalsplitSchuh.svg')
                            .default.src
                        }`,
                      },
                    },
                    percent: {
                      //@ts-ignore
                      color: theme?.colors?.buildings.DEFAULT || '#6060d6',
                      align: 'left',
                      padding: [10, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      //@ts-ignore
                      color: theme?.colors?.primary.DEFAULT || '#005b79',
                      // align: 'center',
                      padding: [0, 0, 0, 50],
                    },
                  },
                },
              },
            ],
            color: colors,
          },
        ],
      }}
    />
  )
}

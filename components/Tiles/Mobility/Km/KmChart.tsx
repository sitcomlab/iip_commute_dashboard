import { ReactECharts } from '@/components/Charts/ReactECharts'
import useKmData from '@/hooks/useKmData'
import {
  ModalsplitAuto,
  ModalsplitBus,
  ModalsplitFahrrad,
  ModalsplitHintergrundgrafik,
  ModalsplitSchuh,
} from '@/components/Icons/'

export default function KmChart() {
  const colors = ['#FF8800', '#59ABE3', '#26C281', '#8800FF']
  const data = useKmData()

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
          textStyle: {
            fontWeight: 'bold',
            fontSize: 14,
          },
        },
        backgroundColor: {
          image: ModalsplitHintergrundgrafik.toString(),
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '50%'],
            labelLine: {
              length: 60,
            },
            data: [
              {
                value: KfzData,
                name: 'KFZ',
                label: {
                  formatter: [
                    '  {Auto|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Auto: {
                      height: 30,
                      width: 30,
                      align: 'left',
                      backgroundColor: {
                        image: ModalsplitAuto.toString(),
                      },
                    },
                    percent: {
                      color: '#FF8800',
                      align: 'center',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 14,
                    },
                    name: {
                      color: 'darkblue',
                      align: 'left',
                      padding: [5, 0, 0, 0],
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
                      height: 30,
                      width: 30,
                      align: 'left',
                      backgroundColor: {
                        image: ModalsplitBus.toString(),
                      },
                    },
                    percent: {
                      color: '#59ABE3',
                      align: 'center',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 14,
                    },
                    name: {
                      color: 'darkblue',
                      align: 'left',
                      padding: [5, 0, 0, 5],
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
                      height: 30,
                      width: 30,
                      align: 'left',
                      backgroundColor: {
                        image: ModalsplitFahrrad.toString(),
                      },
                    },
                    percent: {
                      color: '#26C281',
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 14,
                    },
                    name: {
                      color: 'darkblue',
                      padding: [5, 0, 0, 15],
                    },
                  },
                },
              },
              {
                value: FußData,
                name: 'Fußgänger:innen',
                label: {
                  formatter: [
                    '  {Schuh|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Schuh: {
                      height: 30,
                      width: 30,
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      backgroundColor: {
                        image: ModalsplitSchuh.toString(),
                      },
                    },
                    percent: {
                      color: '#8800FF',
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 14,
                    },
                    name: {
                      color: 'darkblue',
                      padding: [5, 0, 0, 100],
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

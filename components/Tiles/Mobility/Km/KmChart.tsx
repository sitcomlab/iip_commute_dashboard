import { ReactECharts } from '@/components/Charts/ReactECharts'

// type CO2ChartProps = {
//   showFuture?: boolean
// }

export default function KmChart() {
  const colors = ['#FF8800', '#59ABE3', '#26C281', '#8800FF']

  return (
    <ReactECharts
      option={{
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '60%'],
            labelLine: {
              length: 60,
            },
            label: {
              formatter: '{a| {b}\n{c}%}',
              fontWeight: 'bold',
              // rich: {
              //  a: {
              //  color: '#8800FF',
              // },
              // b: {
              //   color: '#59ABE3'
              // },
              // c: {
              //   color: '#26C281'
              // },
              // d: {
              //   color: '#FF8800'
              // }
            },
            data: [
              { value: 29, name: 'KFZ' },
              { value: 10, name: 'ÖPNV' },
              { value: 39, name: 'Fahrrad' },
              { value: 22, name: 'Fußgänger:innen' },
            ],
            color: colors,
          },
        ],
      }}
    />
  )
}

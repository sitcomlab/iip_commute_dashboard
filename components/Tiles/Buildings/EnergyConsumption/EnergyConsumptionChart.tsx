import { ReactECharts } from '@/components/Charts/ReactECharts'
import { BarSeriesOption } from 'echarts'

interface Props {
  data: BarSeriesOption['data']
}

export default function EnergyConsumptionChart({ data }: Props) {
  return (
    <ReactECharts
      option={{
        grid: {
          left: 0,
          top: 5,
          right: 0,
          bottom: 22,
        },
        xAxis: {
          type: 'category',
          data: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            overflow: 'truncate', // or 'break' to continue in a new line
            interval: 0,
            color: '#6060d6',
          },
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data,
            type: 'bar',
            color: '#837ef4',
            barWidth: '11px',
            itemStyle: {
              opacity: 0.77,
            },
          },
        ],
      }}
    />
  )
}

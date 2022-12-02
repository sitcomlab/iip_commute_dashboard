import useCO2Data from '@/hooks/useCO2Data'
import { parse } from 'date-fns'
import Chart from 'react-apexcharts'

type CO2ChartProps = {
  showFuture?: boolean
}

export default function CO2Chart({ showFuture = false }: CO2ChartProps) {
  const data = useCO2Data()

  const categories = showFuture
    ? [...data.map(e => e.Jahr), 2030]
    : data.map(e => e.Jahr)

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
      selection: {
        enabled: false,
      },
    },
    xaxis: {
      categories: categories.map(e =>
        parse(`01-01-${e}`, 'dd-MM-yyyy', new Date()).toDateString(),
      ),
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: false,
    },
  }

  const transformdata = (baseData: any[]) =>
    showFuture ? [...baseData, 0] : baseData

  const series: ApexAxisChartSeries = [
    {
      name: 'Wärme',
      data: transformdata(data.map(e => e.Wärme)),
    },
    {
      name: 'Strom',
      data: transformdata(data.map(e => e.Strom)),
    },
    {
      name: 'Verkehr',
      data: transformdata(data.map(e => e.Verkehr)),
    },
  ]

  return (
    <Chart
      height="100%"
      options={options}
      series={series}
      type="line"
      width="100%"
    />
  )
}

import React, { useEffect, useRef } from 'react'
import { getInstanceByDom, init } from 'echarts'
import type { CSSProperties } from 'react'
import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts'

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
}

export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme, {
        renderer: 'svg',
      })
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize()
    }
    window.addEventListener('resize', resizeChart)

    // Return cleanup function
    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [theme])

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      const myOption: EChartsOption = {
        textStyle: {
          fontFamily: 'var(--font-inter)',
          color: '#005b79',
        },
        ...option,
      }
      chart!.setOption(myOption, settings)
    }
  }, [option, settings, theme]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      loading === true ? chart!.showLoading() : chart!.hideLoading()
    }
  }, [loading, theme])

  return <div className="h-full w-full" ref={chartRef} style={{ ...style }} />
}

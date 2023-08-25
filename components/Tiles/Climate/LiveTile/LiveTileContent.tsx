'use client'

import useLiveData from '@/hooks/useLiveData'
import { useState } from 'react'

export default function WeatherTileContent() {
  const [timestamp, setTimestamp] = useState(new Date())

  var time = useLiveData()

  return (
    <div>
      <span>{time}</span>
    </div>
  )
}

import { isEqual } from 'date-fns'
import { useEffect, useState } from 'react'

const counter = [
  { name: 'Wolbecker Str.', id: '100020113' }, // wolbecker
  { name: 'Promenade', id: '100031297' }, // promenade
  { name: 'Gartenstr.', id: '100034978' }, // gartenstr
  { name: 'Hammer Str.', id: '100034980' }, // hammer str
  { name: 'Warendorfer Str.', id: '100034983' }, // warendorfer
  { name: 'Neutor', id: '100035541' }, // neutor
]

const getBicycleData = async (station: string) => {
  const res = await fetch(
    `https://city-dashboard.felixerdmann.com/bicycle/${station}`,
  )
  const data = await res.json()

  return data
}

export function useBicycleCount(timestamp: Date) {
  timestamp.setUTCHours(0)
  timestamp.setUTCMinutes(0)
  timestamp.setUTCSeconds(0)
  timestamp.setUTCMilliseconds(0)

  const [data, setData] = useState<
    {
      name: string
      id: string
      data: {
        counts: number
        date: string
        isoDate: string
        status: number
      }[]
    }[]
  >()

  const [filteredData, setFilteredData] = useState<
    {
      count: number
      id: string
      name: string
    }[]
  >()

  useEffect(() => {
    const fetchPromise = Promise.all(
      counter.map(async ({ name, id }) => ({
        name,
        id,
        data: await getBicycleData(id),
      })),
    )

    fetchPromise.then(bicycleData => setData(bicycleData))
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    const filtered = data.map(e => ({
      id: e.id,
      name: e.name,
      count:
        e.data.find(m => isEqual(new Date(m.date), timestamp))?.counts || 0,
    }))

    setFilteredData(filtered)
  }, [timestamp, data])

  return filteredData
}

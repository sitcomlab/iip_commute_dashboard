
import { useEffect, useState } from 'react'

type timeApiResponse = string;

//simplest example of a live-updating hook

const getTimeData = async () => {
  const res = await fetch(
    'http://127.0.0.1:8000/time.txt',
  )
  const data = await res.text()
  return data
}

export default function useLiveData() {
  const [data, setData] = useState<timeApiResponse>()

  useEffect(() => {
    const timer = setInterval(() => {
      getTimeData().then(e => setData(e))
    }, 500)

  }, [])

  return data
}
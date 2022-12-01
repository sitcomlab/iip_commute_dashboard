import { BrightSkyResponse, Condition } from '@/types/brightsky'

export type dwd_station_id = string
export type coordinates = { lat: number; lng: number }

const BRIGHTSKY_BASEURL = 'https://api.brightsky.dev/weather'

const getWeather = async (
  location: dwd_station_id | coordinates,
  date = new Date(),
) => {
  let locationQuery: { dwd_station_id: string } | { lat: string; lon: string }
  if (typeof location === 'string' || location instanceof String) {
    locationQuery = {
      // @ts-ignore
      dwd_station_id: location,
    }
  } else {
    locationQuery = {
      lat: location.lat.toString(),
      lon: location.lng.toString(),
    }
  }

  const query = new URLSearchParams({
    ...locationQuery,
    date: date.toISOString(),
  })
  const res = await fetch(`${BRIGHTSKY_BASEURL}?${query.toString()}`)
  return (await res.json()) as Promise<BrightSkyResponse>
}
export default getWeather

type ConditionMapping = {
  [_key in Condition]: string
}

// In Münster ist es gerade ...
export const conditionMapping: ConditionMapping = {
  dry: 'trocken',
  fog: 'nebelig',
  hail: 'am hageln',
  rain: 'regnerisch',
  sleet: 'am Schneeregnen',
  snow: 'am schneien',
  thunderstorm: 'am Gewittern',
}

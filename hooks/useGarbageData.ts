// @ts-ignore
import GarbageData from '@/assets/data/abfallbilanz-2018-2019_0.csv'

type GarbageData = {
  JAHR: number
  KATEGORIE: string
  MERKMAL: string
  WERT: number
  EINHEIT: string
}

export default function useGarbageData(): GarbageData[] {
  return GarbageData
}

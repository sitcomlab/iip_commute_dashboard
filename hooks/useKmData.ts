// @ts-ignore
import KmData from '@/assets/data/mobilitaetsdaten_cleaned.csv'

type KmData = {
  Fuß: number
  Rad: number
  MIV: number
  ÖPNV: number
}

export default function useCO2Data(): KmData[] {
  return KmData
}

// @ts-ignore
import ModalSplitData from '@/assets/data/mobilitaetsdaten_cleaned.csv'

type ModalSplitData = {
  Fuß: number
  Rad: number
  MIV: number
  ÖPNV: number
}

export default function useCO2Data(): ModalSplitData[] {
  return ModalSplitData
}

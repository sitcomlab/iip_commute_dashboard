// @ts-ignore
import CO2Data from '@/assets/data/CO2_Emissionen_Sektoren.csv'

type CO2Data = {
  Jahr: number
  'Private Haushalte': number
  'Gewerbe + Sonstiges': number
  Industrie: number
  Verkehr: number
  Gesamt: number
}

export default function useCO2Data(): CO2Data[] {
  return CO2Data
}

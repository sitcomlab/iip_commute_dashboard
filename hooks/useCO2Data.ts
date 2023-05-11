// @ts-ignore
import CO2Data from '@/assets/data/CO2_Emissionen_Sektoren.csv'
// @ts-ignore
import Endenergieverbrauch from '@/assets/data/endenergieverbrauch.csv'

type CO2Data = {
  Jahr: number
  'Private Haushalte': number
  'Gewerbe + Sonstiges': number
  Industrie: number
  Verkehr: number
  Gesamt: number
}

export default function useCO2Data(series: 'endenergie' | 'co2'): CO2Data[] {
  if (series === 'endenergie') {
    return Endenergieverbrauch
  }
  return CO2Data
}

// @ts-ignore
import CO2Data from '@/assets/data/CO2_Emissionen_Sektoren.csv'
// @ts-ignore
import Endenergieverbrauch from '@/assets/data/endenergie.csv'

type InputDataType = {
  ZEIT: number
  'Endenergieverbrauch nach Sektoren in (GWh) - Gesamt': number
  'Endenergieverbrauch nach Sektoren in (GWh) - Gewerbe + Sonstiges': number
  'Endenergieverbrauch nach Sektoren in (GWh) - Industrie': number
  'Endenergieverbrauch nach Sektoren in (GWh) - Private Haushalte': number
  'Endenergieverbrauch nach Sektoren in (GWh) - Verkehr': number
  'Endenergieverbrauch nach Sektoren in (GWh) - Zielwert 2030 - Gesamt': number
  'Endenergieverbrauch nach Sektoren in (GWh) - Zielwert 2030 - Private Haushalte': number
}

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
    return Endenergieverbrauch.map((d: InputDataType) => ({
      Jahr: d.ZEIT,
      'Private Haushalte':
        d['Endenergieverbrauch nach Sektoren in (GWh) - Private Haushalte'],
      'Gewerbe + Sonstiges':
        d['Endenergieverbrauch nach Sektoren in (GWh) - Gewerbe + Sonstiges'],
      Industrie: d['Endenergieverbrauch nach Sektoren in (GWh) - Industrie'],
      Verkehr: d['Endenergieverbrauch nach Sektoren in (GWh) - Verkehr'],
      Gesamt: d['Endenergieverbrauch nach Sektoren in (GWh) - Gesamt'],
    }))
  }
  return CO2Data
}

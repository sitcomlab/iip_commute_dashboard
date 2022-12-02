// @ts-ignore
import CO2Data from '@/assets/data/Klimaschutz-Bilanz-Muenster-1990-2020.csv'

type CO2Data = {
  'CO2 in kt': number
  'Gesamt in % zu 1990': string
  Jahr: number
  Strom: number
  'Strom in %': string
  Verkehr: number
  'Verkehr in %': string
  Wärme: number
  'Wärme in %': string
}

export default function useCO2Data(): CO2Data[] {
  return CO2Data
}

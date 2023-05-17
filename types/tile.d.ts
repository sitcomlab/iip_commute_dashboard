export type TileTypePrefix =
  | 'climate'
  | 'mobility'
  | 'energy'
  | 'building'
  | 'survey'

export type ClimateTypes =
  | 'weather'
  | 'co2'
  | 'indices'
  | 'development'
  | 'garbage'
export type MobilityTypes = 'bicycle' | 'stadtradeln' | 'bus' | 'modalSplit' | 'awm'
export type BuildingsTypes = 'ecoProfit' | 'energyConsumption'
export type EnergyTypes = 'PV' | 'wind' | 'energietraeger'

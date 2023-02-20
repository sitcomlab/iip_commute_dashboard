import embedRegistry from './embedRegistry'

export const tileIdRegistry: { [id: string]: keyof typeof embedRegistry } = {
  '0d3fda03-44c3-4c8c-8157-7375f71f835f': 'klima',
  '124a5540-734a-4b28-ab8d-594cdff51659': 'CO2',
  '160d8cf1-4452-42ce-b7c2-a50bf59af4dc': 'klimakenntage',
  '54adc2a4-2f00-47fa-a823-e9ca36a92a70': 'wetter',
  '5a31e1ca-6de5-4807-b77a-af790d1faa2a': 'bus',
  '65bbf052-c3e0-4c6a-9804-4ffc69dac68a': 'stadtradeln',
  '83f44fb9-bf15-4b76-8735-efbfc5ae907a': 'radlerinnen',
  'bc63953f-ba99-4065-b3fc-e8a9e3920c4e': 'modalsplit',
  'ccee9201-e37d-41fb-bb4c-4b7de26d0061': 'windenergy',
  'db94cb7d-56e6-4eef-9066-b20a7c677fbe': 'photovolt',
}

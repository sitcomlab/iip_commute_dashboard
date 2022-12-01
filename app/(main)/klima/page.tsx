import Columns from '@/components/Layout/Columns'
import Container from '@/components/Layout/Container'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'

export default function Climate() {
  return (
    <Container>
      <Columns>
        <WeatherTile />
      </Columns>
      <CO2EmissionsTile />
    </Container>
  )
}

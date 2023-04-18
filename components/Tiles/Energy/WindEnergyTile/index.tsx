import ProgressBar from '@/components/Charts/Progress/ProgressBar'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { WindEnergyIcon } from '@/components/Icons'
import Slider from '@/components/Inputs/Slider'
import EnergyTile from '../EnergyTile'

export default function WindEnergyTile() {
  return (
    <EnergyTile
      dataSource={'Stadtwerke Münster'}
      embedId="energy-wind"
      live
      title={
        <span>
          <span className="font-medium">50</span> MW
        </span>
      }
    >
      <div>
        <Title as={'subtitle'}>
          Haben die Müsteraner:innen bereits mit ca.{' '}
          <span className="text-energy">28 Windkraftanlagen</span> in Münster
          produziert. In diesem Moment werden{' '}
          <span className="text-energy">10 MW</span> produziert.
        </Title>
        <div className="mt-8 flex items-center justify-between gap-8">
          <WindEnergyIcon className="w-40" />
          <div className="w-full flex-1">
            <div className="flex  items-center justify-between">
              <div>
                <Title as="h7" variant={'energy'}>
                  Bereits installiert
                </Title>
                <Title as="h4" variant={'energy'}>
                  33%
                </Title>
              </div>
              <div className="flex flex-col items-end">
                <Title as="h7" variant={'primary'}>
                  Angestrebtes Ziel bis 2030
                </Title>
                <Title as="h4" variant={'primary'}>
                  150 MW
                </Title>
              </div>
            </div>
            <Spacer size={'sm'} />
            <ProgressBar progress={33} variant="energy" />
            <Spacer size={'sm'} />
            <Slider
              defaultValue={[0]}
              labels={['2005', '2010', '2015', '2020', 'jetzt']}
              max={4}
              min={0}
              variant={'energy'}
            />
          </div>
        </div>
      </div>
    </EnergyTile>
  )
}

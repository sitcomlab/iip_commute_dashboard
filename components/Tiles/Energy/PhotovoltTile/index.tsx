import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import EnergyTile from '../EnergyTile'

// @ts-ignore
import PVData from '@/assets/data/bestand-pv-anlagen.csv'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { PvIcon } from '@/components/Icons'
import ProgressBar from '@/components/Charts/Progress/ProgressBar'

interface PVDataType {
  ZEIT: string
  AnzahlAnlagen: number
  AnzahlSolarModule: number
  Bruttoleistung: number
  Nettonennleistung: number
}

export default function PhotovoltTile() {
  const [data] = PVData as PVDataType[]

  return (
    <EnergyTile
      dataRetrieval="06.06.2023"
      dataSource={'Marktstammdatenregister'}
      embedId="energy-PV"
      title={
        <>
          <AnimatedNumber>{data.Bruttoleistung / 1000}</AnimatedNumber> MW
        </>
      }
    >
      <div>
        <Title as={'subtitle'}>
          haben die Münsteraner*innen bereits mit{' '}
          <span className="text-energy">
            <AnimatedNumber>{data.AnzahlAnlagen}</AnimatedNumber> PV-Anlagen
          </span>{' '}
          in Münster installiert.
        </Title>
        <div className="mt-8 flex items-center justify-between gap-8">
          <PvIcon className="w-40" />
          <div className="w-full flex-1">
            <div className="flex  items-center justify-between">
              <div>
                <Title as="h7" font="semibold" variant={'energy'}>
                  Bereits installiert
                </Title>
                <Title as="h4" variant={'energy'}>
                  {((data.Bruttoleistung / 1000 / 2500) * 100).toFixed(0)}%
                </Title>
              </div>
              <div className="flex flex-col items-end">
                <Title as="h7" font="semibold" variant={'primary'}>
                  Angestrebtes Ziel bis 2030
                </Title>
                <Title as="h4" variant={'primary'}>
                  2.500 MW
                </Title>
              </div>
            </div>
            <Spacer size={'sm'} />
            <ProgressBar
              progress={(data.Bruttoleistung / 1000 / 2500) * 100}
              variant="energy"
            />
            {/*
            <Spacer size={'sm'} />
            <Slider
              defaultValue={[0]}
              labels={['2005', '2010', '2015', '2020', 'jetzt']}
              max={4}
              min={0}
              variant={'energy'}
            />*/}
          </div>
        </div>
      </div>
    </EnergyTile>
  )
}

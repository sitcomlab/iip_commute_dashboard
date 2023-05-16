import Title from '@/components/Elements/Title'
import EnergyTile from '../EnergyTile'

// @ts-ignore
import WindData from '@/assets/data/bestand-windanlagen.csv'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'

interface WindDataType {
  ZEIT: string
  AnzahlAnlagen: number
  AnzahlSolarModule: number
  Bruttoleistung: number
  Nettonennleistung: number
}

export default function WindEnergyTile() {
  const [data] = WindData as WindDataType[]

  return (
    <EnergyTile
      dataRetrieval={format(new Date(data.ZEIT), 'dd.MM.yyyy')}
      dataSource={'Marktstammdatenregister'}
      embedId="energy-wind"
      live
      title={
        <>
          <AnimatedNumber className="font-medium">
            {data.Nettonennleistung / 1000}
          </AnimatedNumber>{' '}
          MW
        </>
      }
    >
      <div>
        <Title as={'subtitle'}>
          Haben die Müsteraner:innen bereits mit{' '}
          <span className="text-energy">
            <AnimatedNumber>{data.AnzahlAnlagen}</AnimatedNumber>{' '}
            Windkraftanlagen
          </span>{' '}
          in Münster produziert.
        </Title>
        {/* <div className="mt-8 flex items-center justify-between gap-8">
          <WindEnergyIcon className="w-40" />
          <div className="w-full flex-1">
            <div className="flex  items-center justify-between">
              <div>
                <Title as="h7" font="semibold" variant={'energy'}>
                  Bereits installiert
                </Title>
                <Title as="h4" variant={'energy'}>
                  33%
                </Title>
              </div>
              <div className="flex flex-col items-end">
                <Title as="h7" font="semibold" variant={'primary'}>
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
        </div> */}
      </div>
    </EnergyTile>
  )
}

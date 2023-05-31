import Title from '@/components/Elements/Title'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'
import DataTile from '../DataTile'
import { Daten } from '@/components/Icons'

export default function DataCountTile() {
  return (
    <DataTile
      dataRetrieval={format(new Date(), 'dd.MM.yyyy')}
      dataSource={'Stadt Münster'}
      embedId={'climate-data'}
      title={
        <>
          <AnimatedNumber className="font-medium">{20}</AnimatedNumber>{' '}
          Datenkacheln
        </>
      }
    >
      <div>
        <div className="flex flex-row justify-center gap-6">
          <span className="flex flex-col justify-center">
            <Daten className="h-20 text-primary md:h-44" />
          </span>
          <Title as={'subtitle'}>
            Können Sie momentan zu den verschiedenen Kategorien auf unserem
            Dashboard finden. Sie haben Daten?{' '}
            <span className="text-secondary">
              <a href="mailto:smartcity@stadt-muenster.de">
                Schreiben Sie uns!
              </a>
            </span>{' '}
          </Title>
        </div>
      </div>
    </DataTile>
  )
}

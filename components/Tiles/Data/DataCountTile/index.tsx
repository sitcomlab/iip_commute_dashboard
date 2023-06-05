import Title from '@/components/Elements/Title'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'
import DataTile from '../DataTile'
import { Daten } from '@/components/Icons'
import getTileData from '@/lib/api/getTileData'

export default async function DataCountTile() {
  const data = await getTileData('climate-data')
  const infoText = data?.info ?? ''

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
          <Title as={'subtitle'}>{infoText}</Title>
        </div>
      </div>
    </DataTile>
  )
}

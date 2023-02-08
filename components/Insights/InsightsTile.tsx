import Image from 'next/image'
import Link from 'next/link'
import { Spacer } from '../Elements/Spacer'
import Title from '../Elements/Title'

type InsightsTileProps = {
  title: string
  link: string
  image: string
}

export default function InsightsTile({
  title,
  link,
  image,
}: InsightsTileProps) {
  return (
    <div className="h-full overflow-hidden rounded-KD bg-white">
      <Link href={link}>
        <div className="group flex h-full w-full flex-col  bg-secondary transition-all hover:bg-opacity-30">
          <div className="flex flex-1 flex-col justify-between p-8 pb-6 group-hover:text-secondary">
            <Title as={'h3'} variant="inverse">
              {title}
            </Title>
            <Spacer size={'xs'} />
            <Title as="h6" className="underline" variant={'inverse'}>
              Alle anzeigen
            </Title>
          </div>
          <div className="relative h-48 overflow-hidden">
            <Image
              alt={'Image'}
              className="object-cover transition-all group-hover:scale-105"
              fill
              src={image}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

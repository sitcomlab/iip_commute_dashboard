import Image from 'next/image'
import Link from 'next/link'
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
          <div className="flex w-full flex-1 justify-between gap-2 py-[33px] pl-[52px] pr-12 group-hover:text-secondary">
            <Title
              as="h6"
              className="mt-2 flex-[2_2_0%] underline"
              variant={'inverse'}
            >
              Kacheln filtern
            </Title>
            <Title as={'h4'} className="flex-[3_3_0%]" variant="inverse">
              {title}
            </Title>
          </div>
          <div className="relative h-44 overflow-hidden">
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

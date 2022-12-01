import Image from 'next/image'
import Link from 'next/link'

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
    <div className="h-full overflow-hidden rounded-3xl bg-white">
      <Link href={link}>
        <div className="group flex h-full w-full flex-col  bg-secondary-500 transition-all hover:bg-opacity-30">
          <div className="flex flex-1 flex-col justify-between p-8 text-white group-hover:text-secondary-500">
            <p className="text-4xl">{title}</p>
            <p className="mt-8 underline">Alle anzeigen</p>
          </div>
          <div className="relative h-72 overflow-hidden">
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

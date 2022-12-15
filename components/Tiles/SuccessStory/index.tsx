import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import Link from 'next/link'
import Image from 'next/image'

import { BaseTile } from '../Base/BaseTile'

export type SuccessStoryTileProps = {
  text: string
  link: string
  image?: string
  imagePosition?: 'left' | 'right'
}

/**
 * A tile that represents a success story
 * @param SuccessStoryTileProps properties of the success story tile
 * @returns SuccessStoryTileProps
 */
export default function SuccessStoryTile({
  text,
  link,
  image,
  imagePosition = 'left',
}: SuccessStoryTileProps) {
  const Content = (
    <>
      <Title size="sm">Erfolgsgeschichte</Title>
      <Spacer size="sm" />
      <p className="text-3xl text-primary">{text}</p>
      <Spacer />
      <Link href={link}>
        <span className="text-sm font-semibold text-primary underline">
          Hier können Sie aktiv werden
        </span>
      </Link>
    </>
  )

  if (!image) {
    return <BaseTile variant="successStory">{Content}</BaseTile>
  }

  const StoryImage = (
    <div className="relative min-h-[20rem] overflow-hidden md:min-h-[30rem] md:w-2/3">
      <Image
        alt={'Image'}
        className="object-cover object-top transition-all group-hover:scale-105"
        fill
        src={image}
      />
    </div>
  )

  if (imagePosition === 'right') {
    return (
      <BaseTile endImage={StoryImage} variant="successStory">
        {Content}
      </BaseTile>
    )
  }

  return (
    <BaseTile startImage={StoryImage} variant="successStory">
      {Content}
    </BaseTile>
  )
}

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import Link from 'next/link'
import Image from 'next/image'

import { BaseTile } from '../Base/BaseTile'
import { directusImage } from '@/lib/directus'
import { ID } from '@directus/sdk'

export type SuccessStoryTileProps = {
  text: string
  link: string
  image?: string
  imagePosition?: 'left' | 'right'
  moreInfo?: string
  id: string | ID
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
  moreInfo,
  id,
}: SuccessStoryTileProps) {
  const Content = (
    <>
      <Title as="h5" font={'semibold'} variant={'primary'}>
        Erfolgsgeschichte
      </Title>
      <Spacer size="sm" />
      <Title as="h3" variant={'primary'}>
        {text}
      </Title>
      <Spacer />
      <Link href={link}>
        <Title as="h6" className="underline" variant={'primary'}>
          Hier können Sie aktiv werden
        </Title>
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
        src={directusImage(image)}
      />
    </div>
  )

  if (imagePosition === 'right') {
    return (
      <BaseTile
        embedId={`successStory-${id}`}
        endImage={StoryImage}
        moreInfo={moreInfo}
        variant="successStory"
      >
        {Content}
      </BaseTile>
    )
  }

  return (
    <BaseTile
      embedId={`successStory-${id}`}
      moreInfo={moreInfo}
      startImage={StoryImage}
      variant="successStory"
    >
      {Content}
    </BaseTile>
  )
}

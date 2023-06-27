import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import Image from 'next/image'

import { BaseTile } from '../Base/BaseTile'
import { directusImage } from '@/lib/directus'
import { ID } from '@directus/sdk'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
  // eslint-disable-next-line unused-imports/no-unused-vars
  link,
  image,
  imagePosition = 'left',
  moreInfo,
  id,
}: SuccessStoryTileProps) {
  const Content = (
    <>
      <Title as="h5" font={'semibold'} variant={'primary'}>
        Stimmen für Münster
      </Title>
      <Spacer size="sm" />
      <ReactMarkdown
        components={{
          h1: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          h2: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          h3: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          h4: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          h5: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          h6: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          p: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
          a: props => (
            <Title
              as="h3"
              className="mb-4 md:mb-6"
              variant={'primary'}
              {...props}
            />
          ),
        }}
        linkTarget={'_blank'}
        remarkPlugins={[remarkGfm]}
      >
        {text}
      </ReactMarkdown>
      <Spacer />
    </>
  )

  if (!image) {
    return <BaseTile variant="successStory">{Content}</BaseTile>
  }

  const StoryImage = (
    <div className="relative min-h-[20rem] overflow-hidden md:min-h-[30rem] md:w-2/3">
      <Image
        alt={'Image'}
        className="object-cover object-center transition-all group-hover:scale-105"
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

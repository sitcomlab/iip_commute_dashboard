import Back from '@/components/Elements/Back'
import { Spacer } from '@/components/Elements/Spacer'
import AnimatedPage from '@/components/Layout/AnimatedPage'
import Container from '@/components/Layout/Container'
import Footer from '@/components/Layout/Footer'
import CollectionNavbar from '@/components/Layout/Navbar/CollectionNavbar'
import Providers from '@/components/Layout/Providers'
import directus, { collectionsName } from '@/lib/directus'
import { notFound } from 'next/navigation'

// ISR
export async function generateStaticParams() {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['slug'],
    filter: {
      status: 'published',
    },
  })

  if (!data) {
    return
  }

  return data.map(({ slug }) => ({
    slug,
  }))
}

// revalidate each minute
export const revalidate = 60

const getCollection = async (collectionSlug: string) => {
  const { data } = await directus.items(collectionsName).readByQuery({
    filter: {
      slug: collectionSlug,
    },
    fields: ['title', 'description'],
  })

  return data
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { slug } = params

  if (!slug) {
    return notFound()
  }

  const collection = await getCollection(slug)

  if (!collection) {
    return notFound()
  }

  const { title, description } = collection[0]

  return (
    <div className="flex h-screen flex-col">
      <CollectionNavbar description={description || ''} title={title} />
      <Container className="flex-1">
        <Providers>
          <Back />
          <Spacer />
          <AnimatedPage>{children}</AnimatedPage>
        </Providers>
      </Container>
      <Footer />
    </div>
  )
}

import Back from '@/components/Elements/Back'
import { Spacer } from '@/components/Elements/Spacer'
import AnimatedPage from '@/components/Layout/AnimatedPage'
import Container from '@/components/Layout/Container'
import Footer from '@/components/Layout/Footer'
import CollectionNavbar from '@/components/Layout/Navbar/CollectionNavbar'
import Providers from '@/components/Layout/Providers'
import directus, { collectionsName } from '@/lib/directus'
import { notFound } from 'next/navigation'

const getCollection = async (collectionId: string) => {
  const data = await directus.items(collectionsName).readOne(collectionId, {
    fields: ['title', 'description'],
  })

  return data
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  const collection = await getCollection(id)

  if (!collection) {
    return notFound()
  }

  const { title, description } = collection

  return (
    <div className="flex h-screen flex-col">
      <CollectionNavbar description={description || ''} title={title} />
      <div className="flex-1">
        <Providers>
          <Container>
            <Back />
            <Spacer />
            <AnimatedPage>{children}</AnimatedPage>
          </Container>
        </Providers>
      </div>
      <Footer />
    </div>
  )
}

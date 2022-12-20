import embedRegistry from '@/utils/embedRegistry'
import { notFound } from 'next/navigation'

export default async function Share({
  params,
}: {
  params: { id: keyof typeof embedRegistry }
}) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  const EmbedComponent: () => JSX.Element | Promise<JSX.Element> | undefined =
    embedRegistry[id]

  if (!EmbedComponent) {
    return notFound()
  }

  // @ts-expect-error Server Component
  return <EmbedComponent />
}

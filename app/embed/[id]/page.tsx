import TileFactory, { TileType } from '@/utils/TileFactory'
import { notFound } from 'next/navigation'

export default async function Embed({ params }: { params: { id: TileType } }) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  // @ts-expect-error Server Component
  return <TileFactory type={id} />
}

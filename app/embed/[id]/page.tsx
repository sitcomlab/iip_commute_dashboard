import TileFactory, { TileType } from '@/utils/TileFactory'
import { notFound } from 'next/navigation'

export const revalidate = 10

export default async function Embed({ params }: { params: { id: TileType } }) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  return <TileFactory type={id} />
}

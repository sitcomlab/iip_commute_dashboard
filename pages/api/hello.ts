// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import directus, { collectionsName } from '@/lib/directus'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['slug'],
    filter: {
      status: 'published',
    },
  })

  if (!data) {
    return res.status(200).json({ msg: 'No data' })
  }

  const revalidatedPaths: string[] = []

  data.forEach(({ slug }) => {
    const path = `/sammlung/${slug}`
    revalidatedPaths.push(path)
    res.revalidate(path)
  })

  res.status(200).json({ msg: 'Revalidated ' + revalidatedPaths.join(', ') })
}

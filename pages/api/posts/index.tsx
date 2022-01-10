import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '../db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getPosts()
  //   console.log(posts)
  res.status(200).json(posts)
}

export default handler

import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';

type Data = {
  videos: Video[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    res.status(200).json({ videos: data });
  }
};

export default handler;

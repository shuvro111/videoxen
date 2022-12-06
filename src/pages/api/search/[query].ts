import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';
import { client } from '../../../utils/client';
import { searchPostsQuery } from '../../../utils/queries';

type Data = {
  videos: Video[];
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const { query } = req.query;
    if (query) {
      const videosQuery = searchPostsQuery(query as string);
      const videos = await client.fetch(videosQuery);

      res.status(200).json({ videos });
    }
  }
};

export default handler;

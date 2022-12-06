import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';

import { client } from '../../../utils/client';
import { topicPostsQuery } from './../../../utils/queries';

type Data = {
  videos?: Video[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const { topic } = req.query;

    const videosQuery = topicPostsQuery(topic as string);

    const videos = await client.fetch(videosQuery);

    res.status(200).json({ videos: videos });
  }
}

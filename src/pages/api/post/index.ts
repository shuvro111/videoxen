import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';

type Data = {
  videos?: Video[];
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    res.status(200).json({ videos: data });
  } else if (req.method === 'POST') {
    const doc = req.body;

    client.create(doc).then(() => {
      return res.status(200).json({ message: 'uploasded' });
    });
  }
};

export default handler;

import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

type Data = {
  video?: Video[];
  message?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) => {
  if (req.method === 'GET') {
    const query = postDetailQuery(req.query.id as string);
    const data = await client.fetch(query);
    res.status(200).json({ video: data[0] });
  }
  if (req.method === 'PUT') {
    const { userId, comment } = req.body;
    const { id } = req.query;

    const data = await client
      .patch(id as string)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: randomUUID(),
          postedBy: {
            _type: 'postedBy',
            _ref: userId,
          },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
};

export default handler;

import { SanityDocument } from '@sanity/client';
import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';
import { client } from '../../../utils/client';

type Data = {
  video?: Video[] | SanityDocument<Record<string, any>>;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert('after', 'likes[-1]', [
            {
              _key: randomUUID(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json({ video: data, message: 'success' });
  }
};

export default handler;

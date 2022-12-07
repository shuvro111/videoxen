import { SanityDocument } from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../../types/types';
import { client } from '../../../utils/client';

type Data = {
  video?: Video[];
  message?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | SanityDocument<Record<string, unknown>>>
) => {
  if (req.method === 'PUT') {
    const { userId, postId } = req.body;

    const data = await client
      .patch(postId)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();

    res.status(200).json(data);
  }
};

export default handler;

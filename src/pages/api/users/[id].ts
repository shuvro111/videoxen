import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser, Video } from '../../../../types/types';
import { client } from '../../../utils/client';
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '../../../utils/queries';

type Data = {
  user?: IUser;
  userVideos: Video[];
  userLikedVideos: Video[];
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const userquery = singleUserQuery(id as string);
      const userVideosQuery = userCreatedPostsQuery(id as string);
      const userLikedVideosQuery = userLikedPostsQuery(id as string);

      const user = await client.fetch(userquery);
      const userVideos = await client.fetch(userVideosQuery);
      const userLikedVideos = await client.fetch(userLikedVideosQuery);

      res.status(200).json({ user, userVideos, userLikedVideos });
    }
  }
};

export default handler;

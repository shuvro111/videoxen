import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../../../types/types';
import { client } from '../../../utils/client';
import { singleUserQuery } from '../../../utils/queries';

type Data = {
  user?: IUser;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    if (req.query.id) {
      const query = singleUserQuery(req.query.id as string);
      const data = await client.fetch(query);
      res.status(200).json({ user: data });
    }
  }
};

export default handler;

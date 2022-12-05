import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../../../types/types';
import { client } from '../../../utils/client';
import { allUsersQuery } from '../../../utils/queries';

type Data = {
  users?: IUser[];
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const query = allUsersQuery();
    const data = await client.fetch(query);
    res.status(200).json({ users: data });
  }
};

export default handler;

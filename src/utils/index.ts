import { User } from 'next-auth';
import { client } from './client';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (user: User) => {
  const { id, name, email, image } = user;

  const newUser = {
    _id: id,
    _type: 'user',
    name,
    email,
    image,
  };
  client.createIfNotExists(newUser);
};

import { User } from 'next-auth';
import { client } from './client';
export const BASE_URL = process.env.BASE_URL;

export const createOrGetUser = async (user: User) => {
  const { id, name, email, image } = user;

  const newUser = {
    _id: id,
    _type: 'user',
    name,
    username: generateUsername(name as string, 5),
    email,
    image,
  };
  const result = await client.createIfNotExists(newUser);
  return result;
};

export const generateUsername = (name: string, length: number) => {
  let result = name.toLowerCase().replace(/\s/g, '');
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_@.#$';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

import sanityClient from 'part:@sanity/base/client';
const client = sanityClient.withConfig({ apiVersion: '2021-10-21' });

export const isUniqueUsername = async (userName, context) => {
  const { document } = context;

  const userId = document._id;
  const id = userId.includes('drafts') ? userId.split('drafts.')[1] : userId;

  const query = `*[(!(_id in path('drafts.**'))) && _type == "user" && username == '${userName}' && _id != '${id}']`;

  const response = await client.fetch(query);
  return !(response.length > 0);
};

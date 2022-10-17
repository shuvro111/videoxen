import sanityClient from 'part:@sanity/base/client';
const client = sanityClient.withConfig({ apiVersion: '2021-10-21' });

export const isUniqueUsername = async (userName, context) => {
  const { document } = context;

  const user = document.username;
  const userId = document._id;
  const id = userId.includes('drafts') ? userId.split('drafts.')[1] : userId;
  console.log(id);
  /* groq */
  // const query = groq`!defined(*[
  //   _type == 'user' &&
  //   !(userName in [$draft, $published]) &&
  //   name == $userName
  // ][0].userName)`;

  const query = `*[(!(_id in path('drafts.**'))) && _type == "user" && username == '${user}' && _id != '${id}']`;

  const response = await client.fetch(query);
  return !(response.length > 0);
};

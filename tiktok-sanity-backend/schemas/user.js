import { isUniqueUsername } from '../validator/unique';

const user = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const isUnique = await isUniqueUsername(value, context);
          if (!isUnique) return 'Username is not unique';
          return true;
        }).error(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'image',
      title: 'Profile Picture',
      type: 'string',
    },
  ],
};

export default user;

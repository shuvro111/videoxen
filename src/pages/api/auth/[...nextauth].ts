import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createOrGetUser } from '../../../utils';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // console.log({ user, account, profile, email, credentials });
      createOrGetUser(user);
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, //7days
  },
});

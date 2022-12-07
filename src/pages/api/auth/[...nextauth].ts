import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createOrGetUser } from '../../../utils';

console.log(process.env.NEXTAUTH_SECRET);

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
    async signIn() {
      // console.log({ user, account, profile, email, credentials });
      return true;
    },
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        const result = await createOrGetUser(user);
        token = { ...token, username: result.username, id: result._id };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, //7days
  },
});

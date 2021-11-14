import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { findUser } from '../../../util/DB/findQueries';
import { connectToDatabase } from '../../../util/DB/mongodb';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const foundUser = await db
          .collection('users')
          .findOne({ email: credentials.email });

        if (!foundUser) {
          throw new Error('No user found.');
        }

        const checkPassword = await compare(
          credentials.password,
          foundUser.passwordHashed,
        );

        if (!checkPassword) {
          throw new Error('Invalid Password.');
        }

        return {
          name: foundUser.name,
          email: foundUser.email,
          id: foundUser._id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    jwt(token) {
      return token;
    },
    async session(session, token) {
      const foundUser = await findUser(token.sub);
      foundUser._id = foundUser._id.toString();
      delete foundUser.passwordHashed;
      session.user = foundUser;
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});

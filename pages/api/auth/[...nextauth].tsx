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
      async authorize(credentials: { email: string; password: string }) {
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
    jwt(token, user) {
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }

      return token;
    },
    async session(session, token) {
      console.log(token);

      const userId = token.sub;
      const foundUser = await findUser(userId);

      if (foundUser) {
        foundUser._id = foundUser._id.toString();
        delete foundUser.passwordHashed;
        session.user = foundUser;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});

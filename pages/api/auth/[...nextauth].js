import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../util/mongodb';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const result = await db
          .collection('users')
          .findOne({ email: credentials.email });

        if (!result) {
          throw new Error('No user found');
        }

        const checkPassword = await compare(
          credentials.password,
          result.passwordHashed,
        );

        if (!checkPassword) {
          throw new Error("Passwords don't match");
        }

        return { name: result.name, email: result.email, role: result.role };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});

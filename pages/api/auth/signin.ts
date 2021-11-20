import crypto from 'node:crypto';
import { compare } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../../util/cookies';
import { findUserByEmail } from '../../../util/DB/findQueries';
import { addSession } from '../../../util/DB/insertQueries';

export default async function LogInHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    console.log(user);

    if (user) {
      const matchingPasswords = await compare(password, user.passwordHashed);
      if (matchingPasswords) {
        const token = crypto.randomBytes(64).toString('base64');
        console.log(token);

        await addSession(user._id.toString(), token);

        const cookie = createSerializedRegisterSessionTokenCookie(token);

        res
          .status(200)
          .setHeader('set-Cookie', cookie)
          .json({ message: 'User has been logged in.' });
      } else {
        res.status(500).json({ password: 'Password is incorrect.' });
      }
    } else {
      res.status(500).json({ email: 'User not found' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized action' });
  }
}

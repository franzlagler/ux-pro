import crypto from 'node:crypto';
import { compare } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
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

    if (user) {
      const matchingPasswords = await compare(password, user.passwordHashed);
      if (matchingPasswords) {
        const token = crypto.randomBytes(64).toString('base64');

        await addSession(user._id.toString(), token);

        const cookie = createSerializedRegisterSessionTokenCookie(token);

        res
          .status(200)
          .setHeader('Set-Cookie', cookie)
          .send({ message: 'User has been logged in.' });
      } else {
        res.status(500).send({ password: 'Password is incorrect.' });
      }
    } else {
      res.status(500).send({ email: 'User not found' });
    }
  } else {
    res.status(401).send({ message: 'Unauthorized action' });
  }
}

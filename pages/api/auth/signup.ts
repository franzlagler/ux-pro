import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../../util/cookies';
import { findUserByEmail, findUserById } from '../../../util/DB/findQueries';
import {
  addProfile,
  addSession,
  addUser,
} from '../../../util/DB/insertQueries';
import { validateRegistrationDataServerSide } from '../../../util/validation';

export default async function registrationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const validData = validateRegistrationDataServerSide(name, email, password);

    if (validData) {
      const userExists = await findUserByEmail(email);

      if (!userExists) {
        const newUserId = await addUser(name, email, password);
        await addProfile(newUserId);

        const token = crypto.randomBytes(64).toString('base64');

        await addSession(newUserId, token);

        const cookie = createSerializedRegisterSessionTokenCookie(token);

        res
          .status(200)
          .setHeader('set-Cookie', cookie)
          .json({ ok: true, message: 'User has been succesfully created.' });
      } else {
        res.status(422).json({ ok: false, message: 'User already exists' });
      }
    } else {
      res.status(422).json({ ok: false, message: 'Invalid input data' });
    }
  } else {
    res.status(500).json({ ok: false, message: 'Method not allowed' });
  }
}

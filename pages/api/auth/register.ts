import { NextApiRequest, NextApiResponse } from 'next';
import { findUser } from '../../../util/DB/findQueries';
import { addProfile, addUser } from '../../../util/DB/insertQueries';
import { validateRegistrationDataServerSide } from '../../../util/validation';

export default async function registrationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { user, name, email, password } = req.body;

    const validData = validateRegistrationDataServerSide(name, email, password);

    if (validData) {
      const userExists = await findUser(user._id);

      if (!userExists) {
        const newUserId = await addUser(name, email, password);
        await addProfile(newUserId);

        res
          .status(201)
          .json({ ok: true, message: 'User successfully created' });
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

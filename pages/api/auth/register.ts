import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRegistrationDataServerSide } from '../../../util/authentication';
import { addUser, checkIfUserExists } from '../../../util/dbQueries';

export default async function registrationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const validData = validateRegistrationDataServerSide(name, email, password);

    if (validData) {
      const userExists = await checkIfUserExists(email);

      if (!userExists) {
        await addUser(name, email, password);
        res.status(201).json({ message: 'User successfully created' });
      } else {
        res.status(422).json({ message: 'User already exists' });
      }
    } else {
      res.status(422).json({ message: 'Invalid input data' });
    }
  } else {
    res.status(500).json({ message: 'Method not allowed' });
  }
}

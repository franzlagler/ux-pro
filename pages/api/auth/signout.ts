import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../../util/DB/deleteQueries';

export default async function LogInHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const currentSessionToken = req.cookies.sessionTokenRegister;

    const deletedToken = await deleteSessionByToken(currentSessionToken);
    if (deletedToken.acknowledged) {
      res
        .status(200)
        .json({ message: 'User has been successfully logged out.' });
    } else {
      res.status(404).json({ message: 'No user under this session found.' });
    }
  } else {
    res.status(405).json({ message: 'Unauthorized action' });
  }
}

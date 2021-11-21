import { NextApiRequest, NextApiResponse } from 'next';
import { findSession } from '../../util/DB/findQueries';
import { updateUser } from '../../util/DB/updateQueries';

export default async function updateUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const validSession = await findSession(req.cookies.sessionTokenRegister);

    if (validSession) {
      try {
        const { updateKey, updateValue } = req.body;

        const result = await updateUser(
          validSession.userId,
          updateKey,
          updateValue,
        );

        res.status(201).json({ message: result });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized action' });
    }
  } else {
    res.status(401).json({ message: 'Method not allowed' });
  }
}

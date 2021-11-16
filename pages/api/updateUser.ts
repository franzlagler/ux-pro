import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { updateUser } from '../../util/DB/updateQueries';

interface ExtendedSessionType extends Session {
  user?: {
    _id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default async function updateUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const session: ExtendedSessionType | null = await getSession({ req });
    if (session) {
      const { updateKey, updateValue } = req.body;
      const userId = session.user?._id;

      const result = await updateUser(userId, updateKey, updateValue);
      console.log(result);

      res.status(201).json({ message: result });
    } else {
      res.status(401).json({ message: 'Unauthorized action' });
    }
  } else {
    res.status(401).json({ message: 'Method not allowed' });
  }
}

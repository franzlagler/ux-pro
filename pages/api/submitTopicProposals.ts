import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession, Session, User } from 'next-auth';
import { getSession } from 'next-auth/client';

interface ExtendedSessionType extends Session {
  user?: {
    _id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default async function submitTopicProposalsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session: ExtendedSessionType | null = await getSession({ req });

    if (session) {
      const user = session.user;
      const userId = user?._id;
      const { title, textProposal } = req.body;
    } else {
      res.status(401).json({ message: 'Unauthorized Action' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized Method' });
  }
}

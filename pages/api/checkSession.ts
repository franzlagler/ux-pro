import { NextApiRequest, NextApiResponse } from 'next';
import { findSession } from '../../util/DB/findQueries';

export default async function CheckSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const validSession = await findSession(req.cookies.sessionTokenRegister);

      if (validSession) {
        res.status(200).json({ message: true });
      } else {
        res.status(200).json({ message: false });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized method' });
  }
}

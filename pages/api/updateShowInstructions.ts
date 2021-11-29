import { NextApiRequest, NextApiResponse } from 'next';
import { findSession } from '../../util/DB/findQueries';
import { updateProfile } from '../../util/DB/updateQueries';

export default async function CheckSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const validSession = await findSession(req.cookies.sessionTokenRegister);

      if (validSession) {
        const { newValue } = req.body;
        const updatedProfile = await updateProfile(
          validSession.userId,
          'showInstructions',
          newValue,
        );
        console.log(updatedProfile);

        res.status(200).json({ message: 'Updated profile successfully.' });
      } else {
        res.status(401).json({ message: 'No valid session.' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized method' });
  }
}

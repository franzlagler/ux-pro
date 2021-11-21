import { NextApiRequest, NextApiResponse } from 'next';
import { findProfile, findSession } from '../../util/DB/findQueries';
import { insertLatestResults } from '../../util/DB/insertQueries';

export default async function submitResultsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const currentSessionToken = req.cookies.sessionTokenRegister;

    const validSession = await findSession(currentSessionToken);

    if (validSession) {
      try {
        const { finalAnswers } = req.body;
        const foundProfile = await findProfile(validSession.userId);

        let results = foundProfile?.results;

        results = results.filter((el: number) => {
          return el !== finalAnswers[0];
        });
        results.unshift(finalAnswers[0]);

        if (results.length > 3) {
          results.pop();
        }

        await insertLatestResults(validSession.userId, results, finalAnswers);

        res
          .status(200)
          .json({ message: 'Successfully implemented new result' });
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

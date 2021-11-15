import { NextApiRequest, NextApiResponse } from 'next';
import { findProfile } from '../../util/DB/findQueries';
import { insertLatestResults } from '../../util/dbQueries';

export default async function submitResultsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { user, finalAnswers } = req.body;

    if (user) {
      try {
        const foundProfile = await findProfile(user._id);

        let results = foundProfile?.results;

        results = results.filter((el: number) => {
          return el !== finalAnswers[0];
        });
        results.unshift(finalAnswers[0]);

        if (results.length > 3) {
          results.pop();
        }
        console.log(results);

        await insertLatestResults(user._id, results, finalAnswers);

        res
          .status(201)
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

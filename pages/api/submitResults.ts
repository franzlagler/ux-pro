import { NextApiRequest, NextApiResponse } from 'next';
import { findProfile } from '../../util/DB/findQueries';
import { insertLatestResults } from '../../util/dbQueries';

export default async function submitResultsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { user, finalAnswers } = req.body;
    console.log(user);

    if (user) {
      try {
        const foundProfile = await findProfile(user._id);
        console.log(foundProfile);

        let results = foundProfile?.results;
        console.log(finalAnswers);

        results = results.filter((el: number) => {
          if (el !== finalAnswers[0]) {
            return el;
          }
        });
        results.unshift(finalAnswers[0]);

        if (results.length > 3) {
          results.pop();
        }

        await insertLatestResults(
          foundProfile?._id.toString(),
          results,
          finalAnswers,
        );

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

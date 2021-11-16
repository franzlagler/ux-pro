import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { findProfile } from '../../util/DB/findQueries';
import { insertLatestResults } from '../../util/DB/insertQueries';

interface ExtendedSessionType extends Session {
  user?: {
    _id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default async function submitResultsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const session: ExtendedSessionType | null = await getSession({ req });

    if (session) {
      try {
        const userId = session.user?._id;
        const { finalAnswers } = req.body;
        const foundProfile = await findProfile(userId);

        let results = foundProfile?.results;

        results = results.filter((el: number) => {
          return el !== finalAnswers[0];
        });
        results.unshift(finalAnswers[0]);

        if (results.length > 3) {
          results.pop();
        }
        console.log(results);

        await insertLatestResults(userId, results, finalAnswers);

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

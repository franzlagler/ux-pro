import { NextApiRequest, NextApiResponse } from 'next';
import {
  findProfile,
  findUser,
  insertLatestResults,
} from '../../util/dbQueries';

export default async function submitResultsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { session, finalAnswers } = req.body;

    if (session) {
      try {
        const { _id } = await findUser(session.user.email);
        let { results } = await findProfile(_id.toString(), 'results');

        results = results.filter((el: number) => {
          if (el !== finalAnswers[0]) {
            return el;
          }
        });
        results.push(finalAnswers[0]);

        await insertLatestResults(_id.toString(), results, finalAnswers);

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

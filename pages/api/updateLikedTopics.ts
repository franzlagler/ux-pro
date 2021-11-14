import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../util/DB/mongodb';
import { updateLikedTopicsArray } from '../../util/dbQueries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { session, topicNumber, userId } = req.body;

    if (session) {
      try {
        const { db } = await connectToDatabase();
        const foundProfile = await db
          .collection('profiles')
          .find({ userId: userId })
          .toArray();

        const likedTopicsArray = foundProfile[0].favoriteTopics;

        const newLikedTopicsArray = updateLikedTopicsArray(
          topicNumber,
          likedTopicsArray,
        );
        await db
          .collection('profiles')
          .updateOne(
            { userId: userId },
            { $set: { favoriteTopics: newLikedTopicsArray } },
          );

        res
          .status(201)
          .json({ message: 'Upating Favorite Topics ways successful' });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized action' });
    }
  } else {
    res.status(500).json({ message: 'Method not allowed' });
  }

  const { db } = await connectToDatabase();
}

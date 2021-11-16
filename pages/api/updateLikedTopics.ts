import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../util/DB/mongodb';
import { updateLikedTopicsArray } from '../../util/topics';

interface ExtendedSessionType extends Session {
  user?: {
    _id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { topicNumber } = req.body;

    const session: ExtendedSessionType | null = await getSession({ req });

    if (session) {
      try {
        const userId = session.user?._id;
        const { db } = await connectToDatabase();
        const foundProfile = await db
          .collection('profiles')
          .find({ userId })
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
}

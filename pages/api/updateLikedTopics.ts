import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import {
  findProfile,
  findSession,
  findUserById,
} from '../../util/DB/findQueries';
import { connectToDatabase } from '../../util/DB/mongodb';
import { updateProfileFavoriteTopics } from '../../util/DB/updateQueries';
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

    const currentSessionToken = req.cookies.sessionTokenRegister;
    const validSession = await findSession(currentSessionToken);

    if (validSession) {
      try {
        const foundProfile = await findProfile(validSession.userId);
        const newLikedTopicsArray = updateLikedTopicsArray(
          topicNumber,
          foundProfile?.favoriteTopics,
        );
        const updatedProfile = await updateProfileFavoriteTopics(
          foundProfile?.userId,
          newLikedTopicsArray,
        );

        if (updatedProfile.acknowledged) {
          res
            .status(201)
            .json({ message: 'Upating Favorite Topics ways successful' });
        }
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

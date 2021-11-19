import { hash } from 'bcryptjs';
import { ObjectId } from 'bson';
import { connectToDatabase } from './mongodb';

export async function updateDatabase(collection: string, data: any) {
  const { db } = await connectToDatabase();
  await db.collection(collection).insertMany(data);
}

export const updateUser = async (
  userId: string | undefined,
  key: string,
  value: string,
) => {
  const { db } = await connectToDatabase();
  let updatedUser;

  if (key === 'passwordHashed') {
    updatedUser = await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { passwordHashed: await hash(value, 12) } },
      );
  } else {
    updatedUser = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: { [key]: value } });
  }

  if (updatedUser.acknowledged) {
    return 'Successfully updated user';
  }
};

export const updateProfileResults = async (
  userId: string | undefined,
  newResults: number[],
) => {
  const { db } = await connectToDatabase();
  return await db
    .collection('profiles')
    .findOneAndUpdate({ userId }, { $set: { results: newResults } });
};

export const updateExistingResultEntry = async (
  profileId: string,
  finalAnswers: (number | boolean[])[],
  isCorrectlyAnswered: boolean[],
) => {
  const { db } = await connectToDatabase();
  db.collection('results').updateOne(
    { profileId, topicNumber: finalAnswers[0] },
    {
      $set: {
        date: new Date().toLocaleDateString(),
        questionAnswers: finalAnswers.slice(1),
        isCorrectlyAnswered,
      },
    },
  );
};

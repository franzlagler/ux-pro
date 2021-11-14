import { hash } from 'bcryptjs';
import { ObjectId } from 'bson';
import { connectToDatabase } from './mongodb';

export async function updateDatabase(collection: string, data: any) {
  const { db } = await connectToDatabase();
  await db.collection(collection).insertMany(data);
}

export const updateUser = async (
  userId: string,
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

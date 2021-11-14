import { hash } from 'bcryptjs';
import { connectToDatabase } from './mongodb';

export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const { db } = await connectToDatabase();
  const addedUser = await db.collection('users').insertOne({
    name,
    email,
    passwordHashed: await hash(password, 12),
    role: 'student',
  });

  return addedUser.insertedId.toString();
};

export const addProfile = async (userId: string) => {
  const { db } = await connectToDatabase();
  await db
    .collection('profiles')
    .insertOne({ userId, favoriteTopics: [], results: [] });
};

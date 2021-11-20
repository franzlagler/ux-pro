import { connectToDatabase } from './mongodb';

export const deleteSessionByToken = async (token: string) => {
  const { db } = await connectToDatabase();
  const deletedToken = await db.collection('sessions').deleteOne({ token });
  return deletedToken;
};

import { quizQuestions } from '../../util/data';
import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  db.collection('questions').insertMany(quizQuestions);
}

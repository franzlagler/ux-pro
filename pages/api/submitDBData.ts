/* import { defaultQuizQuestions, defaultTopics } from '../../util/DB/defaultData';
import { connectToDatabase } from '../../util/DB/mongodb';

export default async function submitDataHandler(req, res) {
  const { db } = await connectToDatabase();
  await db.collection('topics').insertMany(defaultTopics);
  await db.collection('questions').insertMany(defaultQuizQuestions);
}
 */

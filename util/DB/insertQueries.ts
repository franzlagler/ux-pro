import { hash } from 'bcryptjs';
import { checkIfAnswersCorrect, sortTopicQuestions } from '../quiz';
import { connectToDatabase } from './mongodb';
import {
  updateExistingResultEntry,
  updateProfileResults,
} from './updateQueries';

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

export const addSession = async (userId: string, token: string) => {
  const { db } = await connectToDatabase();
  await db.collection('sessions').dropIndexes();
  await db
    .collection('sessions')
    .insertOne({ userId, token, expiryTimestamp: new Date() });

  await db
    .collection('sessions')
    .createIndex({ expiryTimestamp: 1 }, { expireAfterSeconds: 60 * 60 * 12 });
};

export const addProfile = async (userId: string) => {
  const { db } = await connectToDatabase();
  await db
    .collection('profiles')
    .insertOne({ userId, favoriteTopics: [], results: [] });
};

export const insertNewResultEntry = async (
  profileId: string,
  finalAnswers: (number | boolean[])[],
  isCorrectlyAnswered: boolean[],
) => {
  const { db } = await connectToDatabase();
  db.collection('results').insertOne({
    profileId,
    keyword: `${profileId}-${finalAnswers[0]}`,
    topicNumber: finalAnswers[0],
    date: new Date(),
    questionAnswers: finalAnswers.slice(1),
    isCorrectlyAnswered,
  });
};

export const insertLatestResults = async (
  userId: string | undefined,
  results: number[],
  userAnswers: (number | boolean[])[],
) => {
  const { db } = await connectToDatabase();

  const updatedProfile = await updateProfileResults(userId, results);

  const profileId = updatedProfile.value?._id.toString();

  const foundResult = await db.collection('results').findOne({
    profileId,
    topicNumber: userAnswers[0],
  });

  const topicQuestions = await db
    .collection('questions')
    .find({ topicNumber: userAnswers[0] })
    .toArray();

  const topicQuestionsSorted = sortTopicQuestions(topicQuestions);

  const isCorrectlyAnswered = checkIfAnswersCorrect(
    userAnswers.slice(1),
    topicQuestionsSorted,
  );

  if (foundResult) {
    await updateExistingResultEntry(
      profileId,
      userAnswers,
      isCorrectlyAnswered,
    );
    return;
  }

  await insertNewResultEntry(profileId, userAnswers, isCorrectlyAnswered);
};

export const insertNewTopicProposal = async (
  userId: string,
  title: string,
  fileName: string,
) => {
  const { db } = await connectToDatabase();
  db.collection('submissions').insertOne({
    userId,
    date: new Date().toLocaleDateString(),
    title,
    fileName,
  });
};

import { hash } from 'bcryptjs';
import { checkIfAnswersCorrect, sortTopicQuestions } from '../quiz';
import { findProfile } from './findQueries';
import { connectToDatabase } from './mongodb';
import { updateExistingResultEntry, updateProfile } from './updateQueries';

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
    role: '61a24011bc509c30a527ce77',
  });

  return addedUser.insertedId.toString();
};

export const addSession = async (userId: string, token: string) => {
  const { db } = await connectToDatabase();
  await db
    .collection('sessions')
    .insertOne({ userId, token, expiryTimestamp: new Date() });

  await db
    .collection('sessions')
    .createIndex({ expiryTimestamp: 1 }, { expireAfterSeconds: 60 * 60 * 12 });
};

export const addProfile = async (userId: string) => {
  const { db } = await connectToDatabase();
  await db.collection('profiles').insertOne({
    userId,
    favoriteTopics: [],
    results: [],
    showInstructions: true,
  });
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

  await updateProfile(userId, 'results', results);

  const foundUser = await findProfile(userId);

  const foundResult = await db.collection('results').findOne({
    profileId: foundUser?._id.toString(),
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
      foundUser?._id.toString(),
      userAnswers,
      isCorrectlyAnswered,
    );
    return;
  }

  await insertNewResultEntry(
    foundUser?._id.toString(),
    userAnswers,
    isCorrectlyAnswered,
  );
};

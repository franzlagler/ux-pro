import { ObjectID } from 'bson';
import { connectToDatabase } from './mongodb';

export const findAllTopics = async () => {
  const { db } = await connectToDatabase();
  const allTopics = await db.collection('topics').find().toArray();
  for (let i = 0; i < allTopics.length; i++) {
    allTopics[i]._id = allTopics[i]._id.toString();
  }
  return allTopics;
};

export const findTopic = async (key: string, value: string) => {
  const { db } = await connectToDatabase();

  const foundTopic = await db.collection('topics').findOne({ [key]: value });

  if (foundTopic) {
    delete foundTopic._id;
  }

  return foundTopic;
};

export const findTopicQuestions = async (topicNumber: number) => {
  const { db } = await connectToDatabase();
  const questions = await db
    .collection('questions')
    .find({ topicNumber })
    .toArray();

  for (let i = 0; i < questions.length; i++) {
    questions[i]._id = questions[i]._id.toString();
  }

  return questions;
};

export const findFirstQuestionKeyword = async (topicNumber: string) => {
  const { db } = await connectToDatabase();

  const question = await db
    .collection('questions')
    .findOne({ topicNumber: topicNumber });

  return question?.keyword;
};

export const findCurrentQuestion = async (keyword: string) => {
  const { db } = await connectToDatabase();

  const currentQuestion = await db
    .collection('questions')
    .findOne({ keyword: keyword });

  if (currentQuestion) {
    currentQuestion['_id'] = currentQuestion._id.toString();
    delete currentQuestion.answers;
  }

  return currentQuestion;
};

export const findUserByEmail = async (email: string | undefined) => {
  if (email) {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    return user;
  }
};

export const findUserById = async (userId: string | undefined) => {
  if (userId) {
    const { db } = await connectToDatabase();
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectID(userId) });

    if (user) {
      delete user.passwordHashed;
      user._id = user._id.toString();
    }

    return user;
  }
};

export const findSession = async (token: string | undefined) => {
  const { db } = await connectToDatabase();
  const session = await db.collection('sessions').findOne({ token });
  return session;
};

export const findProfile = async (userId: string | undefined) => {
  const { db } = await connectToDatabase();
  const foundProfile = await db.collection('profiles').findOne({ userId });

  if (foundProfile) {
    foundProfile._id = foundProfile._id.toString();
  }

  return foundProfile;
};

export const findResult = async (profileId: string, topicNumber: number) => {
  const { db } = await connectToDatabase();

  const result = await db
    .collection('results')
    .findOne({ profileId: profileId, topicNumber: topicNumber });

  if (result) {
    delete result._id;
  }
  return result;
};

export const findThreeLatestQuizResults = async (
  profileId: string,
  results: number[],
  previousQuizzesTitle: { title: string }[],
) => {
  const { db } = await connectToDatabase();

  const latestThreeQuizResults = [];

  for (let i = 0; i < 3; i++) {
    const singleResult = await db
      .collection('results')
      .findOne({ profileId, topicNumber: results[i] });

    if (singleResult) {
      delete singleResult._id;
      singleResult.title = previousQuizzesTitle[i].title;
      singleResult.date = singleResult.date.toString();
      latestThreeQuizResults.push(singleResult);
    }
  }

  return latestThreeQuizResults;
};

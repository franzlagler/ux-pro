import { ObjectId } from 'bson';
import { connectToDatabase } from './mongodb';

export const getAllTopics = async () => {
  const { db } = await connectToDatabase();
  const allTopics = await db.collection('topics').find().toArray();
  for (let i = 0; i < allTopics.length; i++) {
    allTopics[i]._id = allTopics[i]._id.toString();
  }
  return allTopics;
};

export const findTopic = async (key, value) => {
  const { db } = await connectToDatabase();

  const [foundTopic] = await db
    .collection('topics')
    .find({ [key]: value })
    .project({ _id: 0 })
    .toArray();

  return foundTopic;
};

export const findQuestions = async (topicNumber: number) => {
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

  const [currentQuestion] = await db
    .collection('questions')
    .find({ keyword: keyword })
    .project({ answers: 0 })
    .toArray();

  currentQuestion._id = currentQuestion._id.toString();
  return currentQuestion;
};

export const findUser = async (userId: string) => {
  if (userId) {
    const { db } = await connectToDatabase();
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });

    return user;
  }
};

export const findProfile = async (userId: string) => {
  const { db } = await connectToDatabase();
  const foundProfile = await db.collection('profiles').findOne({ userId });

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
      latestThreeQuizResults.push(singleResult);
    }
  }

  return latestThreeQuizResults;
};

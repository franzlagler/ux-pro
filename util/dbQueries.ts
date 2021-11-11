import { hash } from 'bcryptjs';
import { quizQuestions } from './data';
import { connectToDatabase } from './mongodb';

export async function updateDatabase() {
  const { db } = await connectToDatabase();
  await db.collection('topics').insertMany(quizQuestions);
}

export const checkIfUserExists = async (email: string) => {
  const { db } = await connectToDatabase();
  const exists = await db.collection('users').findOne({ email: email });

  if (exists) return true;
  return false;
};

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

export const findTopicQuestions = async (topicNumber: string) => {
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

export const findFirstQuestion = async (topicNumber: string) => {
  const { db } = await connectToDatabase();

  const question = await db
    .collection('questions')
    .find({ topicNumber: topicNumber })
    .toArray();

  if (question.length !== 0) {
    return question;
  }
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

export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const { db } = await connectToDatabase();
  const user = await db.collection('users').insertOne({
    name,
    email,
    passwordHashed: await hash(password, 12),
    role: 'student',
  });

  console.log(user);

  await db.collection('profiles').insertOne({
    userId: user.insertedId.toString(),
    favoriteTopics: [],
    results: [],
  });
};

export const findUser = async (email: string | null | undefined) => {
  if (email) {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').find({ email: email }).toArray();

    if (user.length !== 0) {
      return user[0];
    }
  }
};

export const findProfile = async (id: string) => {
  const { db } = await connectToDatabase();
  const user = await db.collection('profiles').find({ userId: id }).toArray();

  if (user.length !== 0) {
    return user[0];
  }

  return null;
};

export const checkIfTopicLiked = async (
  likedTopics: [],
  topicNumber: number,
) => {
  let isLiked = false;

  for (let i = 0; i < likedTopics.length; i++) {
    if (likedTopics[i] === topicNumber) {
      isLiked = true;
    }
  }

  return isLiked;
};

export const updateLikedTopicsArray = (topicNumber: number, arr: number[]) => {
  if (arr.includes(topicNumber)) {
    return arr.filter((el) => el !== topicNumber);
  }
  return [...arr, topicNumber];
};

export const filterTopics = (
  allTopics: Document[],
  favoriteTopics: Document[] | null,
) => {
  if (favoriteTopics) {
    const filteredArray = [];
    for (let i = 0; i < favoriteTopics.length; i++) {
      for (let j = 0; j < allTopics.length; j++) {
        if (favoriteTopics[i] === allTopics[j].topicNumber) {
          filteredArray.push(allTopics[j]);
        }
      }
    }

    return filteredArray;
  }
};

export const insertLatestResults = async (
  userId: string,
  results: number[],
  finalAnswers: (number | boolean[])[],
) => {
  const { db } = await connectToDatabase();

  await db
    .collection('profiles')
    .updateOne({ userId: userId }, { $set: { results: results } });
  const { _id } = await db.collection('profiles').findOne({ userId });

  const foundResult = await db
    .collection('results')
    .findOne({ profileId: _id.toString(), topicNumber: finalAnswers[0] });
  console.log(foundResult);

  if (foundResult) {
    await db
      .collection('results')
      .updateOne(
        { profileId: _id.toString(), topicNumber: finalAnswers[0] },
        { $set: { questionAnswers: finalAnswers.slice(1) } },
      );
    return;
  }

  await db.collection('results').insertOne({
    profileId: _id.toString(),
    keyword: `${_id.toString()}-${finalAnswers[0]}`,
    topicNumber: finalAnswers[0],
    questionAnswers: finalAnswers.slice(1),
  });
};

export const findPreviousQuizzes = async (profileId: string) => {
  const { db } = await connectToDatabase();

  const previousTopics = await db
    .collection('results')
    .find({ profileId })
    .toArray();
  return previousTopics;
};

export const getPreviousQuizData = (
  resultsArray: number[],
  allTopicsArray: {}[],
) => {
  const previousQuizData: [] = [];

  for (let i = 0; i < resultsArray.length; i++) {
    for (let j = 0; j < allTopicsArray.length; j++) {
      if (resultsArray[i] === allTopicsArray[j].topicNumber) {
        previousQuizData.push({ title: allTopicsArray[j].title });
      }
    }
  }
  return previousQuizData;
};

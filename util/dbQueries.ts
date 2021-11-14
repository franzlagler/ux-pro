import { hash } from 'bcryptjs';
import { ObjectId } from 'bson';
import { checkIfAnswersCorrect } from './cookies';
import { quizQuestions } from './data';
import { connectToDatabase } from './DB/mongodb';

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
  console.log('Hello' + userId);

  const updatedUser = await db
    .collection('profiles')
    .updateOne(
      { userId: new ObjectId(userId) },
      { $set: { results: results } },
    );

  const foundResult = await db.collection('results').findOne({
    profileId: updatedUser.upsertedId.toString(),
    topicNumber: finalAnswers[0],
  });

  const questions = await db
    .collection('questions')
    .find({ topicNumber: finalAnswers[0] })
    .toArray();

  const isCorrectlyAnswered = checkIfAnswersCorrect(
    finalAnswers.slice(1),
    questions,
  );

  if (foundResult) {
    await db.collection('results').updateOne(
      { profileId: _id.toString(), topicNumber: finalAnswers[0] },
      {
        $set: {
          date: new Date().toLocaleDateString(),
          questionAnswers: finalAnswers.slice(1),
          isCorrectlyAnswered,
        },
      },
    );
    return;
  }

  await db.collection('results').insertOne({
    profileId: _id.toString(),
    keyword: `${_id.toString()}-${finalAnswers[0]}`,
    topicNumber: finalAnswers[0],
    date: new Date().toLocaleDateString(),
    questionAnswers: finalAnswers.slice(1),
    isCorrectlyAnswered,
  });
};

export const getPreviousQuizTitle = (results: number[], allTopics: {}[]) => {
  const previousQuizData: [] = [];

  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < allTopics.length; j++) {
      if (results[i] === allTopics[j].topicNumber) {
        previousQuizData.push({ title: allTopics[j].title });
      }
    }
  }
  return previousQuizData;
};

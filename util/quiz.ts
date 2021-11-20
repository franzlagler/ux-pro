import { Document } from 'bson';

interface AllTopicsType extends Document {
  topicNumber?: number;
  title?: string;
}

export const getPreviousQuizTitle = (
  results: number[],
  allTopics: AllTopicsType,
) => {
  const previousQuizData: { title: string }[] = [];

  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < allTopics.length; j++) {
      if (results[i] === allTopics[j].topicNumber) {
        previousQuizData.push({ title: allTopics[j].title });
      }
    }
  }
  return previousQuizData;
};

export const updateAnswers = (
  selectedAnswers: boolean[],
  allAnswers: (number | boolean[])[],
  currentQuestionNumber: number,
) => {
  allAnswers = allAnswers.map((el: number | boolean[], index: number) => {
    if (index === currentQuestionNumber) {
      return selectedAnswers;
    }

    return el;
  });

  return allAnswers;
};

export const checkIfAnswersCorrect = (
  userAnswers: any,
  questions: Document[],
) => {
  console.log(userAnswers);
  console.log(questions);

  const questionIsCorrectlyAnswered = [];
  for (let i = 0; i < userAnswers.length; i++) {
    let isCorrect = true;
    for (let j = 0; j < questions[i].correctAnswers.length; j++) {
      if (userAnswers[i][j] !== questions[i].correctAnswers[j]) {
        console.log(userAnswers[i][j], questions[i].correctAnswers[j]);

        isCorrect = false;
      }
    }
    questionIsCorrectlyAnswered.push(isCorrect);
  }
  return questionIsCorrectlyAnswered;
};

export const sortTopicQuestions = (topicQuestions: Document[]) => {
  return topicQuestions.sort((curQuestion, nextQuestion) => {
    const curQuestionNumber = Number(
      curQuestion.keyword[curQuestion.keyword.length - 1],
    );
    const nextQuestionNumber = Number(
      nextQuestion.keyword[nextQuestion.keyword.length - 1],
    );
    return curQuestionNumber - nextQuestionNumber;
  });
};

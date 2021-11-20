import { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnswerButton, RegularButton } from '../../components/Buttons';
import { NarrowContainer } from '../../components/ContainerElements';
import {
  getCookies,
  getSessionCookie,
  setCookies,
  setCookieValue,
} from '../../util/cookies';
import {
  findCurrentQuestion,
  findSession,
  findTopicQuestions,
  findUserById,
} from '../../util/DB/findQueries';
import { updateAnswers } from '../../util/quiz';

const QuestionContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  border: 5px solid #212529;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
`;
const PrimHeadingContainer = styled.div`
  padding: 20px 10px;
  @media (max-width: 500px) {
    padding: 10px;
  }
`;

const AnswersContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  @media (max-width: 500px) {
    display: flex;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  @media (max-width: 500px) {
    height: 300px;
  }
  @media (max-width: 500px) {
    height: 200px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 20px;
`;

const QuestionNumber = styled.p`
  width: fit-content;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #ffee99;
  border: 5px solid #212529;
  border-radius: 15px;
  font-size: 22px;
  font-weight: 600;
`;

type QuizProps = {
  currentQuestion: {
    _id: string;
    topicNumber: number;
    keyword: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
  };
  allQuestions: {}[];
  foundUser: {} | null;
};

export default function Quiz({
  currentQuestion,
  allQuestions,
  foundUser,
}: QuizProps) {
  const numberOfQuestions = allQuestions.length;
  const currentQuestionNumber = Number(
    currentQuestion.keyword[currentQuestion.keyword.length - 1],
  );
  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState([
    false,
    false,
    false,
    false,
  ]);

  const updateSelectedAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonIndex = Number(e.currentTarget.id) - 1;

    setSelectedAnswers(
      selectedAnswers.map((el, index) => (index === buttonIndex ? !el : el)),
    );
  };

  const goToNextQuestion = () => {
    let userAnswers = getCookies('userAnswers');

    userAnswers = updateAnswers(
      selectedAnswers,
      userAnswers,
      currentQuestionNumber,
    );

    setCookies('userAnswers', userAnswers);

    router.push(
      `/quizzes/${currentQuestion.keyword.slice(
        0,
        currentQuestion.keyword.length - 1,
      )}${Number(currentQuestionNumber) + 1}`,
    );
  };

  const goToLastQuestion = () => {
    let userAnswers = getCookies('userAnswers');

    userAnswers = updateAnswers(
      selectedAnswers,
      userAnswers,
      currentQuestionNumber,
    );

    setCookies('userAnswers', userAnswers);
    router.push(
      `/quizzes/${currentQuestion.keyword.slice(
        0,
        currentQuestion.keyword.length - 1,
      )}${Number(currentQuestionNumber) - 1}`,
    );
  };

  const finishQuiz = async () => {
    let userAnswers = getCookies('userAnswers');

    userAnswers = updateAnswers(
      selectedAnswers,
      userAnswers,
      currentQuestionNumber,
    );

    setCookies('userAnswers', userAnswers);
    const finalAnswers = getCookies('userAnswers');

    if (foundUser) {
      const result = await fetch('/api/submitResults', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foundUser, finalAnswers }),
      });
    }
    router.push('/results');
  };

  useEffect(() => {
    if (!getCookies('userAnswers')) {
      setCookies(
        'userAnswers',
        setCookieValue(currentQuestion.topicNumber, numberOfQuestions),
      );
    }
    const allAnswers = getCookies('userAnswers');

    const currentlySelectedAnswers = allAnswers[currentQuestionNumber];
    setSelectedAnswers(currentlySelectedAnswers);
  }, [currentQuestionNumber, currentQuestion.topicNumber, numberOfQuestions]);
  return (
    <NarrowContainer>
      <QuestionContainer>
        <PrimHeadingContainer>
          <h2>{currentQuestion.question}</h2>
        </PrimHeadingContainer>
        <ImageContainer>
          <Image
            src={`/images/questions/${currentQuestion.keyword}.svg`}
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
      </QuestionContainer>
      <AnswersContainer>
        <AnswerButton
          backgroundColor={selectedAnswers[0]}
          id="1"
          name="answer1"
          onClick={updateSelectedAnswers}
        >
          {currentQuestion.answer1}
        </AnswerButton>
        <AnswerButton
          backgroundColor={selectedAnswers[1]}
          id="2"
          name="answer2"
          onClick={updateSelectedAnswers}
        >
          {currentQuestion.answer2}
        </AnswerButton>
        <AnswerButton
          backgroundColor={selectedAnswers[2]}
          id="3"
          name="answer3"
          onClick={updateSelectedAnswers}
        >
          {currentQuestion.answer3}
        </AnswerButton>
        <AnswerButton
          backgroundColor={selectedAnswers[3]}
          id="4"
          name="answer4"
          onClick={updateSelectedAnswers}
        >
          {currentQuestion.answer4}
        </AnswerButton>
      </AnswersContainer>
      <ButtonContainer>
        <RegularButton
          disabled={currentQuestionNumber === 1}
          onClick={goToLastQuestion}
        >
          Back
        </RegularButton>
        {currentQuestionNumber < 3 && (
          <RegularButton purple onClick={goToNextQuestion}>
            Next
          </RegularButton>
        )}
        {currentQuestionNumber === 3 && (
          <Link href="/results" passHref>
            <RegularButton purple onClick={finishQuiz}>
              Finish
            </RegularButton>
          </Link>
        )}
      </ButtonContainer>

      <QuestionNumber>
        {currentQuestionNumber} out of {numberOfQuestions} questions
      </QuestionNumber>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query.quiz;

  if (typeof keyword === 'string') {
    const currentQuestion = await findCurrentQuestion(keyword);
    if (!currentQuestion) {
      return {
        redirect: {
          destination: '/topics',
          permanent: false,
        },
      };
    }
    const allQuestions = await findTopicQuestions(currentQuestion.topicNumber);

    const currentSessionToken = getSessionCookie(context.req?.headers.cookie);
    const validSession = await findSession(currentSessionToken);

    if (validSession) {
      const foundUser = await findUserById(validSession.userId);

      return {
        props: {
          currentQuestion,
          allQuestions,
          foundUser,
        },
      };
    } else {
      return {
        props: { currentQuestion, allQuestions },
      };
    }
  }
}

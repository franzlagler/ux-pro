import { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  AnswerButton,
  LinkButton,
  RegularButton,
} from '../../components/Buttons';
import { NarrowContainer } from '../../components/ContainerElements';
import { getCookies, setCookies, setCookieValue } from '../../util/cookies';
import { connectToDatabase } from '../../util/mongodb';

const QuestionContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  border: 3px solid #212529;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
`;
const PrimHeadingContainer = styled.div`
  padding: 20px 10px;
`;

const AnswersContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
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
  border: 2px solid #212529;
  border-radius: 15px;
  font-size: 22px;
  font-weight: 600;
`;

export default function Quiz(props: {
  currentQuestion: {
    _id: string;
    topic_id: number;
    question: string;
    keyword: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
  };
  currentQuestionNumber: number;
  totalQuestionsLength: number;
}) {
  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState([
    false,
    false,
    false,
    false,
  ]);

  const selectAnswer = (index: number) => {
    const arrayCopy = [...selectedAnswers];
    arrayCopy[index] = true;
    setSelectedAnswers(arrayCopy);
  };

  const deselectAnswer = (index: number) => {
    const arrayCopy = [...selectedAnswers];
    arrayCopy[index] = false;
    setSelectedAnswers(arrayCopy);
  };

  const updateSelectedAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonIndex = Number(e.currentTarget.id) - 1;
    if (!selectedAnswers[buttonIndex]) {
      selectAnswer(buttonIndex);
      return;
    }

    deselectAnswer(buttonIndex);
  };

  const goToNextQuestion = () => {
    let questionAnswers = getCookies('questionAnswers');
    console.log(selectedAnswers);

    questionAnswers = questionAnswers.map(
      (el: { question: number; answers: boolean[] }) => {
        console.log(el.question, props.currentQuestionNumber);

        if (el.question === props.currentQuestionNumber) {
          return {
            topic: props.currentQuestion.topic_id,
            question: props.currentQuestionNumber,
            answers: selectedAnswers,
          };
        }

        return el;
      },
    );

    setCookies('questionAnswers', questionAnswers);

    router.push(
      `/quizzes/${props.currentQuestion.keyword.slice(
        0,
        props.currentQuestion.keyword.length - 1,
      )}${Number(props.currentQuestionNumber) + 1}`,
    );
  };

  const goToLastQuestion = () => {
    let questionAnswers = getCookies('questionAnswers');
    console.log(selectedAnswers);

    questionAnswers = questionAnswers.map(
      (el: { question: number; answers: boolean[] }) => {
        console.log(el.question, props.currentQuestionNumber);

        if (el.question === props.currentQuestionNumber) {
          return {
            topic: props.currentQuestion.topic_id,
            question: props.currentQuestionNumber,
            answers: selectedAnswers,
          };
        }

        return el;
      },
    );

    setCookies('questionAnswers', questionAnswers);
    router.push(
      `/quizzes/${props.currentQuestion.keyword.slice(
        0,
        props.currentQuestion.keyword.length - 1,
      )}${Number(props.currentQuestionNumber) - 1}`,
    );
  };

  const finishQuiz = () => {
    let questionAnswers = getCookies('questionAnswers');
    console.log(selectedAnswers);

    questionAnswers = questionAnswers.map(
      (el: { question: number; answers: boolean[] }) => {
        console.log(el.question, props.currentQuestionNumber);

        if (el.question === props.currentQuestionNumber) {
          return {
            topic: props.currentQuestion.topic_id,
            question: props.currentQuestionNumber,
            answers: selectedAnswers,
          };
        }

        return el;
      },
    );

    setCookies('questionAnswers', questionAnswers);
    router.push('/results');
  };

  useEffect(() => {
    if (!getCookies('questionAnswers')) {
      setCookies(
        'questionAnswers',
        setCookieValue(
          props.currentQuestion.topic_id,
          props.totalQuestionsLength,
        ),
      );
    }
    const allAnswers = getCookies('questionAnswers');

    const currentlySelectedAnswers =
      allAnswers[props.currentQuestionNumber - 1].answers;
    setSelectedAnswers(currentlySelectedAnswers);
  }, [
    props.currentQuestionNumber,
    props.totalQuestionsLength,
    props.currentQuestion.topic_id,
  ]);
  return (
    <NarrowContainer>
      <QuestionContainer>
        <PrimHeadingContainer>
          <h2>{props.currentQuestion.question}</h2>
        </PrimHeadingContainer>
        <ImageContainer>
          <Image
            src={`/images/questions/${props.currentQuestion.keyword}.svg`}
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
          {props.currentQuestion.answer1}
        </AnswerButton>
        <AnswerButton
          backgroundColor={selectedAnswers[1]}
          id="2"
          name="answer2"
          onClick={updateSelectedAnswers}
        >
          {props.currentQuestion.answer2}
        </AnswerButton>
        <AnswerButton
          backgroundColor={selectedAnswers[2]}
          id="3"
          name="answer3"
          onClick={updateSelectedAnswers}
        >
          {props.currentQuestion.answer3}
        </AnswerButton>
        <AnswerButton
          backgroundColor={selectedAnswers[3]}
          id="4"
          name="answer4"
          onClick={updateSelectedAnswers}
        >
          {props.currentQuestion.answer4}
        </AnswerButton>
      </AnswersContainer>
      <ButtonContainer>
        <RegularButton
          disabled={props.currentQuestionNumber === 1}
          onClick={goToLastQuestion}
        >
          Back
        </RegularButton>
        {props.currentQuestionNumber < 3 && (
          <RegularButton purple onClick={goToNextQuestion}>
            Next
          </RegularButton>
        )}
        {props.currentQuestionNumber === 3 && (
          <Link href="/results" passHref>
            <RegularButton purple onClick={finishQuiz}>
              Finish
            </RegularButton>
          </Link>
        )}
      </ButtonContainer>

      <QuestionNumber>
        {props.currentQuestionNumber} out of {props.totalQuestionsLength}{' '}
        questions
      </QuestionNumber>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const param = context.query.quiz;

  const { db } = await connectToDatabase();
  const res1 = await db
    .collection('questions')
    .find({ keyword: param })
    .toArray();

  const currentQuestion = res1[0];
  const currentQuestionNumber = Number(
    currentQuestion.keyword[currentQuestion.keyword.length - 1],
  );

  const res3 = await db
    .collection('questions')
    .find({ topic_id: currentQuestion['topic_id'] })
    .toArray();

  const totalQuestionsLength = res3.length;

  return {
    props: {
      currentQuestion,
      currentQuestionNumber,
      totalQuestionsLength,
    },
  };
}

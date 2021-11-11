import cookie from 'cookie';
import { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RegularButton } from '../../components/Buttons';
import { WideContainer } from '../../components/ContainerElements';
import { PrimHeading, SecHeading } from '../../components/TextElements';
import { getCookies, removeCookie } from '../../util/cookies';
import { quizQuestions } from '../../util/data';
import { findTopic, findTopicQuestions } from '../../util/dbQueries';
import { connectToDatabase } from '../../util/mongodb';

const SingleResultContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const AnswerContainer = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
  border-radius: 5px;
`;

const AnswerText = styled.p`
  font-size: 20px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #212529;
  border-radius: 3px;

  &:checked {
    background: url('/images/cross.svg') no-repeat center;
  }
`;

export default function Results({
  questionAnswers,
  topicNumber,
  topicQuestions,
}) {
  const router = useRouter();

  const redoQuiz = () => {
    removeCookie('questionAnswers');
    router.push(`/quizzes/${topicQuestions[0].keyword}`);
  };
  return (
    <WideContainer>
      <PrimHeading>Results</PrimHeading>
      {topicQuestions.map(
        (
          el: {
            _id: string;
            question: string;
            answer1: string;
            answer2: string;
            answer3: string;
            answer4: string;
          },
          index: number,
        ) => {
          return (
            <SingleResultContainer key={el._id}>
              <SecHeading>
                {index + 1}. {el.question}
              </SecHeading>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[0] === true &&
                  questionAnswers[index + 1][0] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    questionAnswers[index + 1][0] === true ? true : false
                  }
                />
                <AnswerText>{el.answer1}</AnswerText>
              </AnswerContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[1] === true &&
                  questionAnswers[index + 1][1] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    questionAnswers[index + 1][1] === true ? true : false
                  }
                />
                <AnswerText>{el.answer2}</AnswerText>
              </AnswerContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[2] === true &&
                  questionAnswers[index + 1][2] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    questionAnswers[index + 1][2] === true ? true : false
                  }
                />
                <AnswerText>{el.answer3}</AnswerText>
              </AnswerContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[3] === true &&
                  questionAnswers[index + 1][3] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    questionAnswers[index + 1][3] === true ? true : false
                  }
                />
                <AnswerText>{el.answer4}</AnswerText>
              </AnswerContainer>
            </SingleResultContainer>
          );
        },
      )}
      <RegularButton onClick={redoQuiz}>Try Again</RegularButton>
    </WideContainer>
  );
}

export async function getServerSideProps(context) {
  if (!context.req?.headers.cookie) {
    return {
      redirect: {
        destination: '/topics',
        permanent: false,
      },
    };
  }

  let { questionAnswers } = cookie.parse(context.req.headers.cookie);
  questionAnswers = JSON.parse(questionAnswers);
  console.log(questionAnswers);

  const topicNumber = questionAnswers[0];
  const topicQuestions = await findTopicQuestions(topicNumber);
  console.log(topicQuestions);

  return {
    props: { questionAnswers, topicNumber, topicQuestions },
  };
}

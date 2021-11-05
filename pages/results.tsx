import cookie from 'cookie';
import { NextPageContext } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WideContainer } from '../components/ContainerElements';
import { PrimHeading, SecHeading } from '../components/TextElements';
import { getCookies } from '../util/cookies';
import { quizQuestions } from '../util/data';
import { connectToDatabase } from '../util/mongodb';

const SingleResultContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px 20px;
  margin-bottom: 20px;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const AnswerContainer = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 5px;
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
`;

export default function Results(props) {
  console.log(props.allQuestionAnswers);

  return (
    <WideContainer>
      <PrimHeading>Results</PrimHeading>
      {props.questions.map((el, index) => {
        return (
          <SingleResultContainer key={el._id}>
            <SecHeading>{el.question}</SecHeading>
            <AnswerContainer>
              <Checkbox
                type="checkbox"
                disabled
                checked={
                  props.allQuestionAnswers[index].answers[0] === true
                    ? true
                    : false
                }
              />
              <AnswerText>{el.answer1}</AnswerText>
            </AnswerContainer>
            <AnswerContainer>
              <Checkbox
                type="checkbox"
                disabled
                checked={
                  props.allQuestionAnswers[index].answers[1] === true
                    ? true
                    : false
                }
              />
              <AnswerText>{el.answer2}</AnswerText>
            </AnswerContainer>
            <AnswerContainer>
              <Checkbox
                type="checkbox"
                disabled
                checked={
                  props.allQuestionAnswers[index].answers[2] === true
                    ? true
                    : false
                }
              />
              <AnswerText>{el.answer3}</AnswerText>
            </AnswerContainer>
            <AnswerContainer>
              <Checkbox
                type="checkbox"
                disabled
                checked={
                  props.allQuestionAnswers[index].answers[3] === true
                    ? true
                    : false
                }
              />
              <AnswerText>{el.answer4}</AnswerText>
            </AnswerContainer>
          </SingleResultContainer>
        );
      })}
    </WideContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const foundCookie = cookie.parse(context.req?.headers.cookie);
  const { questionAnswers } = foundCookie;
  const allQuestionAnswers = JSON.parse(questionAnswers);

  const topicId = allQuestionAnswers[0].topic;
  const { db } = await connectToDatabase();
  const questions = await db
    .collection('questions')
    .find({ topic_id: topicId })
    .toArray();

  return {
    props: { questions, allQuestionAnswers },
  };
}

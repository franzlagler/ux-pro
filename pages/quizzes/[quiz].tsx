import { NextPageContext } from 'next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnswerButton, LinkButton } from '../../components/Buttons';
import { WideContainer } from '../../components/ContainerElements';
import { changeToPurple, changeToWhite } from '../../state/answerBackground';
import { deselect, select } from '../../state/selectedAnswers';
import { RootState } from '../../state/store';
import { connectToDatabase } from '../../util/mongodb';

const quiz1 = {
  question:
    "What should be the approximate minimum size of a button so that it's easy to click? ",
  answer1: '10x10px',
  answer2: '200x200px',
  answer3: '40x40px',
  answer4: '90x90px',
  correct: 'answer3',
};

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 24px;
  background-color: #ada7ff;
  border: 3px solid #212529;
  border-radius: 15px;

  text-align: center;
`;

const AnswersContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export default function Quiz(props) {
  const answerBackground = useSelector(
    (state: RootState) => state.answerBackground.value,
  );
  const selectedAnswers = useSelector(
    (state: RootState) => state.selectedAnswers.value,
  );
  const dispatch = useDispatch();

  const selectAnswer = ({ currentTarget }) => {
    const index = currentTarget.id - 1;
    console.log(index);

    const name = currentTarget.name;

    if (selectedAnswers[index] === false || selectedAnswers.length === 0) {
      dispatch(changeToPurple(index));
      dispatch(select(index));

      return;
    }

    dispatch(changeToWhite(index));
    dispatch(deselect(index));
  };

  return (
    <WideContainer>
      <QuestionContainer>
        <h1>{quiz1.question}</h1>
      </QuestionContainer>
      <AnswersContainer>
        <AnswerButton
          backgroundColor={answerBackground[0]}
          id="1"
          name="answer1"
          onClick={selectAnswer}
        >
          {quiz1.answer1}
        </AnswerButton>
        <AnswerButton
          backgroundColor={answerBackground[1]}
          id="2"
          name="answer2"
          onClick={selectAnswer}
        >
          {quiz1.answer2}
        </AnswerButton>
        <AnswerButton
          backgroundColor={answerBackground[2]}
          id="3"
          name="answer3"
          onClick={selectAnswer}
        >
          {quiz1.answer3}
        </AnswerButton>
        <AnswerButton
          backgroundColor={answerBackground[3]}
          id="4"
          name="answer4"
          onClick={selectAnswer}
        >
          {quiz1.answer4}
        </AnswerButton>
      </AnswersContainer>
    </WideContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { db } = await connectToDatabase();
  const data = await db.collection('questions').find({}).toArray();
  console.log(data);

  return {
    props: { data },
  };
}

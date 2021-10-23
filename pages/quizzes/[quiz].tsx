import { useState } from 'react';
import styled from 'styled-components';
import { AnswerButton, LinkButton } from '../../components/Buttons';

const quiz1 = {
  question:
    "What should be the approximate minimum size of a button so that it's easy to click? ",
  answer1: '10x10px',
  answer2: '200x200px',
  answer3: '40x40px',
  answer4: '90x90px',
  correct: 'answer3',
};

const QuizContainer = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2% 0;
`;

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

export default function Quiz() {
  const [buttonBackground, setButtonBackground] = useState([
    '#f8f9fa',
    '#f8f9fa',
    '#f8f9fa',
    '#f8f9fa',
  ]);
  const checkAnswer = ({ currentTarget }) => {
    const buttonId = currentTarget.id;
    const buttonName = currentTarget.name;

    if (buttonName === quiz1.correct) {
      setButtonBackground(
        buttonBackground.map((el, index) => {
          if (index === Number(buttonId - 1)) {
            return '#76f5c0';
          }

          return el;
        }),
      );
      setTimeout(
        () => setButtonBackground(buttonBackground.map(() => 'inerhit')),
        500,
      );
    } else {
      setButtonBackground(
        buttonBackground.map((el, index) => {
          if (index === Number(buttonId - 1)) {
            return '#ff4d6d';
          }

          return el;
        }),
      );
      setTimeout(
        () => setButtonBackground(buttonBackground.map(() => 'inerhit')),
        500,
      );
    }
  };
  return (
    <QuizContainer>
      <QuestionContainer>
        <h1>{quiz1.question}</h1>
      </QuestionContainer>
      <AnswersContainer>
        <AnswerButton
          backgroundColor={buttonBackground[0]}
          id="1"
          name="answer1"
          onClick={checkAnswer}
        >
          {quiz1.answer1}
        </AnswerButton>
        <AnswerButton
          backgroundColor={buttonBackground[1]}
          id="2"
          name="answer2"
          onClick={checkAnswer}
        >
          {quiz1.answer2}
        </AnswerButton>
        <AnswerButton
          backgroundColor={buttonBackground[2]}
          id="3"
          name="answer3"
          onClick={checkAnswer}
        >
          {quiz1.answer3}
        </AnswerButton>
        <AnswerButton
          backgroundColor={buttonBackground[3]}
          id="4"
          name="answer4"
          onClick={checkAnswer}
        >
          {quiz1.answer4}
        </AnswerButton>
      </AnswersContainer>
    </QuizContainer>
  );
}

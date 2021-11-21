import { NextPageContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { RegularButton } from '../../components/Buttons';
import {
  HeadingContainer,
  WideContainer,
} from '../../components/ContainerElements';
import { PrimHeading, SecHeading } from '../../components/TextElements';
import { getUserAnswersCookie, removeCookie } from '../../util/cookies';
import { findTopicQuestions } from '../../util/DB/findQueries';
import { checkIfAnswersCorrect, sortTopicQuestions } from '../../util/quiz';

const SingleResultContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 5px solid #212529;
  border-radius: 15px;
  /* Hello*/
`;

export const QuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: 20px;
`;

const AnswerContainer = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
  border-radius: 5px;
`;

const AnswerText = styled.p`
  font-size: 20px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 5px solid #212529;
  border-radius: 3px;

  &:checked {
    background: url('/images/cross.svg') no-repeat center;
  }
`;

interface ResultsProps {
  topicQuestions: {
    _id: string;
    keyword: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswers: boolean[];
  }[];
  userAnswers: boolean[][];
  correctlyAnsweredQuestions: boolean[];
}

export default function Results({
  userAnswers,
  topicQuestions,
  correctlyAnsweredQuestions,
}: ResultsProps) {
  const router = useRouter();

  const redoQuiz = () => {
    removeCookie('userAnswers');
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
              <HeadingContainer>
                <SecHeading>
                  {index + 1}. {el.question}
                </SecHeading>
                <Image
                  src={`/images/${
                    correctlyAnsweredQuestions[index]
                      ? 'correctAnswer'
                      : 'wrongAnswer'
                  }.svg`}
                  width="30px"
                  height="30px"
                />
              </HeadingContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[0] === true &&
                  userAnswers[index][0] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={userAnswers[index][0] === true ? true : false}
                />
                <AnswerText>{el.answer1}</AnswerText>
              </AnswerContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[1] === true &&
                  userAnswers[index][1] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={userAnswers[index][1] === true ? true : false}
                />
                <AnswerText>{el.answer2}</AnswerText>
              </AnswerContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[2] === true &&
                  userAnswers[index][2] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={userAnswers[index][2] === true ? true : false}
                />
                <AnswerText>{el.answer3}</AnswerText>
              </AnswerContainer>
              <AnswerContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[3] === true &&
                  userAnswers[index][3] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={userAnswers[index][3] === true ? true : false}
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

export async function getServerSideProps(context: NextPageContext) {
  const userAnswers = getUserAnswersCookie(context.req?.headers.cookie);

  if (!userAnswers) {
    return {
      redirect: {
        destination: '/topics',
        permanent: false,
      },
    };
  }

  const topicNumber = Number(userAnswers[0]);
  let topicQuestions = await findTopicQuestions(topicNumber);
  topicQuestions = sortTopicQuestions(topicQuestions);
  const correctlyAnsweredQuestions = await checkIfAnswersCorrect(
    userAnswers.slice(1),
    topicQuestions,
  );

  return {
    props: {
      userAnswers: userAnswers.slice(1),
      topicNumber,
      topicQuestions,
      correctlyAnsweredQuestions,
    },
  };
}

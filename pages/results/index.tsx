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
`;

const AnswerContainer = styled.div`
  display: flex;
  grid-gap: 16px;
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
  min-width: 20px;
  min-height: 20px;
  border: 1px solid #212529;
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
